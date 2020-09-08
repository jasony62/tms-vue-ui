import { createField, FieldNest } from './fields'

import { setVal, initChild, getChild } from './utils'

export class Parser {
  constructor(vm, editDoc, schema) {
    this.fields = {}
    this.vm = vm
    this.editDoc = editDoc
    this.rootSchema = schema
    this.schemaRefs = {}
  }
  /**
   * 根据schema的定义初始化表单的model对象
   *
   * @param {Field} field
   */
  setModelValue(field) {
    const { editDoc } = this
    const ns = field.name.split('.')
    const vmValue = getChild(this.vm, editDoc, ns)
    if (!vmValue) {
      const n = ns.pop()
      const ret = ns.length > 0 ? initChild(this.vm, editDoc, ns) : editDoc
      this.vm.oneWay ? setVal(this.vm, ret, n, field.value) : this.vm.$set(ret, n, field.value)
    }
  }

  async parse(schema = this.rootSchema, fields = this.fields, schemaPath, editDoc = this.editDoc) {
    if (!schema || schema.visible === false) return

    const pathname = schemaPath ? schemaPath.join('.') : schema.name // 指定的名字或路径名
    if (schema.type !== 'object' && !pathname) return

    if (schema.$id) this.schemaRefs[schema.$id] = schema

    if (schema.type === 'object' && !schema.items) {
      // 给对象属性创建一个field，对象下的filed都放在这field中，便于后续显示时，将对象作为一个整体处理
      if (schema.name && !fields[schema.name]) {
        fields[schema.name] = new FieldNest(schema)
      }
      // 设置必填属性
      if (schema.required) {
        for (const key of schema.required) {
          if (schema.properties[key]) {
            schema.properties[key].required = true
          }
        }
      }
      if (schema.eventDependencies && JSON.stringify(schema.eventDependencies) !== '{}') {
        let items = new Set();
        for (const key in schema.eventDependencies) {
          items.add(key)
          const config = schema.eventDependencies[key]
          config.rule.params.forEach(param => {
            items.add(param)
            schema.properties[param].assocs = schema.properties[param].assocs || new Array()
            schema.properties[param].assocs.push(key)
          })
        }

        const isFlag = Array.from(items).every(item => editDoc[item])

        if (!isFlag) {
          for (const key in schema.properties) {
            const currentProperty = schema.properties[key]
            if (currentProperty.assocs) {
              for (let i = 0; i < currentProperty.assocs.length; i++) {
                let oDep, oRule;
                oDep = currentProperty.assocs[i]
                oRule = schema.eventDependencies[oDep].rule
                let postData = {}
                oRule.params.forEach(param => {
                  postData[param] = {
                    'feature': 'start',
                    'keyword': editDoc[param]
                  }
                })
                this.vm.onAxios().post(oRule.url, { 'filter': postData }).then(rst => {
                  const data = rst.data.result.docs || rst.data.result
                  if (oRule.type === 'v1') {
                    editDoc[oDep] = data[0][oDep] || data[oDep]
                  } else if (oRule.type === 'v2') {
                    let arr = []
                    data.forEach(item => {
                      let value = item[oDep]
                      arr.push({ 'label': value, 'value': value })
                    })
                    fields[oDep].items = arr
                    if (data.length === 1) {
                      editDoc[oDep] = arr[0].value
                    }
                  }
                }).catch(() => {
                  this.vm.setErrorMessage('数据解析错误')
                })
              }
            }
          }
        }
      }
      // 解析子属性
      for (const key in schema.properties) {
        // 设置子属性的名称
        const child = schema.properties[key]
        child.name = key
        this.parse(child, fields[schema.name], schemaPath ? [...schemaPath, key] : [key], editDoc[schema.name])
      }
      return
    }
    const newField = createField(schema, pathname, this.schemaRefs, editDoc[schema.name])

    this.setModelValue(newField)

    fields[schema.name] = newField
  }

  static parse(vm, editDoc, schema) {
    const parser = new Parser(vm, editDoc, schema)
    parser.parse()
    return parser.fields
  }
}

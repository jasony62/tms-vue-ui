import { createField, FieldNest } from './fields'

import { initChild, getChild } from './utils'

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
    const vmValue = getChild(editDoc, ns)
    if (!vmValue) {
      const n = ns.pop()
      const ret = ns.length > 0 ? initChild(editDoc, ns) : editDoc
      this.vm.$set(ret, n, field.value)
      //setVal(ret, n, field.value)
    }
  }

  parse(schema = this.rootSchema, fields = this.fields, sub) {
    if (!schema || schema.visible === false) return

    const pathname = sub ? sub.join('.') : schema.name // 指定的名字或路径名
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
      // 解析子属性
      for (const key in schema.properties) {
        // 设置子属性的名称
        const child = schema.properties[key]
        child.name = key
        this.parse(child, fields[schema.name], sub ? [...sub, key] : [key])
      }
      return
    }
    const newField = createField(schema, pathname, this.schemaRefs)

    this.setModelValue(newField)

    //fields[schemaName] = newField
    fields[schema.name] = newField
  }

  static parse(vm, editDoc, schema) {
    const parser = new Parser(vm, editDoc, schema)
    parser.parse()
    return parser.fields
  }
}

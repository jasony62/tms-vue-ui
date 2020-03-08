import { createField } from './fields'

import { initChild, getChild, setVal } from './utils'

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
    const schemaName = sub ? sub.join('.') : schema.name
    if (schema.type !== 'object' && !schemaName) return

    if (schema.$id) this.schemaRefs[schema.$id] = schema

    if (schema.type === 'object' && !schema.items) {
      for (const key in schema.properties) {
        schema.properties[key].name = key

        if (schema.required) {
          for (const field of schema.required) {
            if (schema.properties[field]) {
              schema.properties[field].required = true
            }
          }
        }
        // 给对象创建一个field，对象下的filed都放在该field中，便于后续显示时，将对象作为一个整体处理
        if (schema.name && !fields[schemaName]) {
          fields[schemaName] = {
            $sub: true, // 指明这是嵌套定义
            $title: schema.title,
            $description: schema.description
          }
        }
        this.parse(schema.properties[key], schema.name ? fields[schemaName] : undefined, sub ? [...sub, key] : [key])
      }
      return
    }
    const newField = createField(schema, schemaName, this.schemaRefs)

    this.setModelValue(newField)

    fields[schemaName] = newField
  }

  static parse(vm, editDoc, schema) {
    const parser = new Parser(vm, editDoc, schema)
    parser.parse()
    return parser.fields
  }
}

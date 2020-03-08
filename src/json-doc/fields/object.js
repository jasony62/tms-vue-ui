import { Field } from './field'

export class FieldObject extends Field {
  constructor(schema, schemaName, refs) {
    super(schema, schemaName)
    this.multiple = schema.minItems > 1
    this.type = schema.type
    if (schema.items.$ref) {
      if (refs[schema.items.$ref]) {
        this.itemSchema = refs[schema.items.$ref]
      }
    } else {
      this.itemSchema = schema.items
    }
    if (schema.type === 'array') this.value = Array.isArray(this.value) ? this.value : []
    else if (schema.type === 'object') this.value = typeof this.value === 'object' ? this.value : {}
  }
}

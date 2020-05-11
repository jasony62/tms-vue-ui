import { Field } from './field'

export class FieldFile extends Field {
  constructor(schema, schemaName) {
    super(schema, schemaName)
    this.type = 'file'
    this.value = Array.isArray(this.value) ? this.value : []
  }
}

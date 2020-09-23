import { Field } from './field'

export class FieldFile extends Field {
  constructor(schema, schemaName, value) {
    super(schema, schemaName)
    this.type = 'file'
    this.value = Array.isArray(value) ? value : Array.isArray(this.value) ? this.value : []
    this.multiple = false
    this.attachment = schema.attachment
    if (this.schema.items && this.schema.items.formatAttrs) {
      Object.entries(this.schema.items.formatAttrs).forEach(([key, value]) => {
        this[key] = value
        if (key === 'limit') {
          let val = value ? parseInt(value) : 1
          if (val > 1) this.multiple = true
          this[key] = val
        }
        if (key === 'size') {
          let val = value ? value : "20"
          this[key] = val
        }
      })
    }
  }
}

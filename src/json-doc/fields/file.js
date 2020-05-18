import { Field } from './field'

export class FieldFile extends Field {
  constructor(schema, schemaName, value) {
    super(schema, schemaName)
    this.type = 'file'
		this.value = Array.isArray(value) ? value : Array.isArray(this.value) ? this.value : []
		this.multiple = false
		if (this.schema.items && this.schema.items.attrs) {
			Object.entries(this.schema.items.attrs).forEach(([key, value]) => {
				if (key==='limit') {
					const val = value ? parseInt(value) : 1
					if (val>1) this.multiple = true
				}
				if (key==='size') {
					value ? parseInt(field.size) : 20 
				}
				this[key] = value
			})
		}
  }
}

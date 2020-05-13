import { Field } from './field'

export class FieldFile extends Field {
  constructor(schema, schemaName) {
    super(schema, schemaName)
    this.type = 'file'
		this.value = Array.isArray(this.value) ? this.value : []
		this.multiple = false
		if (this.schema.items.attrs) {
			Object.entries(this.schema.items.attrs).forEach(([key, value]) => {
				if (key==='limit') {
					const val = parseInt(value)
					if (val>1) this.multiple = true
				}
				this[key] = value
			})
		}
  }
}

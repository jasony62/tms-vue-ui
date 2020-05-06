import { Field } from './field'

/**
 * file
 */
export class FieldFile extends Field {
  constructor(...args) {
		super(...args)
		
		this.multiple = this.schema.minItems > 1
		
    if (!this.type ) {
			this.type = this.schema.format
		}
		
		this.value = Array.isArray(this.value) ? this.value : []

    if (this.schema.items.attrs) {
			this.multiple = false
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

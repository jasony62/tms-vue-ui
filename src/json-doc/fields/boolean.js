import { Field } from './field'

export class FieldBoolean extends Field {
  constructor(...args) {
    super(...args)
    if (!this.type) {
      this.type = 'checkbox'
    }

    this.checked = this.checked || false
  }
}

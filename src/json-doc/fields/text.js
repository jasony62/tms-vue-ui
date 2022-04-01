import { Field } from './field'

/**
 * number,integer,string
 */
export class FieldText extends Field {
  constructor(...args) {
    super(...args)

    if (!this.type && this.schema.format) {
      switch (this.schema.format) {
        case 'email':
          this.type = 'email'
          break
        case 'uri':
          this.type = 'url'
          break
        case 'regex':
          this.type = 'text'
          this.pattern = this.schema.pattern
          break
        case 'dateTime':
          this.type = 'dateTime'
          break
      }
    }

    if (!this.type) {
      switch (this.schema.type) {
        case 'number':
        case 'integer':
          this.type = 'number'
          break
        case 'json':
          this.type = 'textarea'
          break
        default:
          this.type = 'text'
      }
    }

    if (this.schema.minLength) {
      this.minlength = this.schema.minLength
    }

    if (this.schema.maxLength) {
      this.maxlength = this.schema.maxLength
    }
  }
}

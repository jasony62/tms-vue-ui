export const ARRAY_KEYWORDS = ['anyOf', 'oneOf', 'enum']
/**
 *
 */
export class Field {
  constructor(schema, pathname) {
    if (typeof schema.attrs === 'object') Object.assign(this, schema.attrs)
    // schema.default 或者 attrs.value 或者 ''
    if (schema.type === 'array') {
      this.value = schema.hasOwnProperty('default')
        ? [...schema.default]
        : this.hasOwnProperty('value')
        ? this.value
        : []
    } else {
      this.value = schema.hasOwnProperty('default') ? schema.default : this.hasOwnProperty('value') ? this.value : ''
    }
    this.component = schema.component
    this.schemaType = schema.type
    this.label = schema.title || ''
    this.description = schema.description || ''
    this.required = schema.required || false
    this.disabled = schema.readonly || false
    this.assocs = schema.assocs
    //this.name = schema.name ? schema.name : pathname
    this.name = pathname
    this.schema = schema
    if (schema.type === 'json') {
      if (this.value === '') this.value = {}
      this.value = JSON.stringify(this.value)
      this.schemaType = 'string'
    }
  }
}

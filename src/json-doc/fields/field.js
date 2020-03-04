export const ARRAY_KEYWORDS = ['anyOf', 'oneOf', 'enum']
/**
 *
 */
export class Field {
  constructor(schema, schemaName) {
    if (typeof schema.attrs === 'object') Object.assign(this, schema.attrs)
    // schema.default 或者 attrs.value 或者 ''
    this.value = schema.hasOwnProperty('default') ? schema.default : this.hasOwnProperty('value') ? this.value : ''
    this.component = schema.component
    this.schemaType = schema.type
    this.label = schema.title || ''
    this.description = schema.description || ''
    this.required = schema.required || false
    this.disabled = schema.disabled || false
    this.name = schema.name ? schema.name : schemaName
    this.schema = schema
  }
}

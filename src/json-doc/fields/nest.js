/**
 * 嵌套
 */
export class FieldNest {
  constructor(schema) {
    this.schemae = schema
    this.$sub = true
    this.$title = schema.title
    this.$description = schema.description
  }
}

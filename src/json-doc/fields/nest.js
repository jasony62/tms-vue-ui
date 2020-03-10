/**
 * 嵌套
 * 属性必须以$开头
 */
export class FieldNest {
  constructor(schema) {
    this.$schema = schema
    this.$sub = true
    this.$title = schema.title
    this.$description = schema.description
  }
}

import { Field } from './field'

export class FieldFile extends Field {
  constructor(schema, schemaName) {
    super(schema, schemaName)
    this.type = 'file'
    const fileList = [
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg',
      },
      {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg',
      },
    ]

    this.value = Array.isArray(this.value) ? this.value : fileList
  }
}

import { Field, ARRAY_KEYWORDS } from './field'
import { FieldBoolean } from './boolean'
import { FieldText } from './text'
import { FieldArray } from './array'
import { FieldFreeArray } from './free-array'

function createField(schema, schemaName, refs) {
  let newField
  switch (schema.type) {
    case 'boolean':
      newField = new FieldBoolean(schema, schemaName)
      break

    case 'array':
      newField = ARRAY_KEYWORDS.some(kw => schema.hasOwnProperty(kw))
        ? new FieldArray(schema, schemaName)
        : new FieldFreeArray(schema, schemaName, refs)
      break

    case 'integer':
    case 'number':
    case 'string':
      for (const keyword of ARRAY_KEYWORDS) {
        if (schema.hasOwnProperty(keyword)) {
          schema.items = {
            type: schema.type,
            enum: schema[keyword]
          }
          newField = new FieldArray(schema, schemaName)
          break
        }
      }
      if (!newField) newField = new FieldText(schema, schemaName)
      break
    default:
      newField = new FieldText(schema, schemaName)
  }
  return newField
}

export { createField, Field, ARRAY_KEYWORDS, FieldBoolean, FieldText, FieldArray, FieldFreeArray }

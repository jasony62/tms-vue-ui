import { Field, ARRAY_KEYWORDS } from './field'
import { FieldBoolean } from './boolean'
import { FieldText } from './text'
import { FieldArray } from './array'
import { FieldObject } from './object'
import { FieldNest } from './nest'

function createField(schema, pathname, refs) {
  let newField
  switch (schema.type) {
    case 'boolean':
      newField = new FieldBoolean(schema, pathname)
      break

    case 'array':
      newField = ARRAY_KEYWORDS.some(kw => schema.hasOwnProperty(kw))
        ? new FieldArray(schema, pathname)
        : new FieldObject(schema, pathname, refs)
      break
    case 'object':
      newField = new FieldObject(schema, pathname, refs)
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
          newField = new FieldArray(schema, pathname)
          break
        }
      }
      if (!newField) newField = new FieldText(schema, pathname)
      break
    default:
      newField = new FieldText(schema, pathname)
  }
  return newField
}

export { createField, Field, ARRAY_KEYWORDS, FieldBoolean, FieldText, FieldArray, FieldObject, FieldNest }

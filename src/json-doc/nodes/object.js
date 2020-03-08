import { deepClone } from '../utils'
import { components } from './index'
import { FieldNode } from './field-node'

export class ObjectNode extends FieldNode {
  options() {
    const fieldValue = this.fieldValue()
    const { createElement, field } = this
    const { schema } = field
    const options = {
      props: { value: fieldValue }
    }
    options.scopedSlots = {
      default: props => {
        const itemSchema = deepClone(field.itemSchema)
        if (schema.type === 'array') {
          const index = fieldValue.indexOf(props.line)
          itemSchema.name = `[${index}]`
        }
        return createElement(components.jsondoc.tag, {
          props: {
            schema: itemSchema,
            doc: props.line,
            requireButtons: false,
            oneWay: false
          }
        })
      }
    }
    options.on = {
      add: cbAdd => {
        if (schema.type === 'array') cbAdd({})
        else if (schema.type === 'object') cbAdd({}, schema.name + parseInt(Math.random() * 100))
      }
    }

    return options
  }
}

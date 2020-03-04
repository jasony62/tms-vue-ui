import { deepClone } from '../utils'
import { components } from './index'
import { FieldNode } from './field-node'

export class ArrayNode extends FieldNode {
  options() {
    const fieldValue = this.fieldValue()
    const { createElement, field } = this
    const options = {
      props: { lines: fieldValue }
    }
    options.scopedSlots = {
      default: props => {
        const index = fieldValue.indexOf(props.line)
        const itemSchema = deepClone(field.itemSchema)
        itemSchema.name = `[${index}]`
        console.log('iiii', itemSchema)
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
      add: () => {
        fieldValue.push({})
      }
    }

    return options
  }
}

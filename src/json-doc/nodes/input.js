import { initChild, getChild } from '../utils'
import { FieldNode } from './field-node'

export class Input extends FieldNode {
  /**
   * 更新field对应的model数据
   */
  updateModel(newValue) {
    const { field } = this
    const fieldName = field.name
    const ns = fieldName.split('.')
    const n = ns.pop()
    const formModel = ns.length > 0 ? initChild(this.vm.editDoc, ns) : this.vm.editDoc
    this.vm.$set(formModel, n, newValue)
  }
  /**
   *
   *
   * @param {*} attrOrProps
   */
  options(attrOrProps) {
    const fieldName = this.field.name
    const fieldValue = getChild(this.vm.editDoc, fieldName.split('.'))
    const inputOptions = {
      ref: fieldName,
      domProps: {
        value: fieldValue
      },
      on: {
        input: event => {
          const newValue = event && event.target ? event.target.value : event
          this.updateModel(newValue)
          this.vm.$emit('input', this.vm.editDoc)
        }
      },
      ...attrOrProps
    }
    if (!inputOptions.hasOwnProperty('props')) inputOptions.props = {}
    inputOptions.props.value = fieldValue

    return inputOptions
  }
  children() {
    const children = []
    if (/radio|checkbox/.test(this.field.type)) this.createItems(children)
    return children
  }
  createItems(children) {
    const { createElement, field } = this
    if (field.hasOwnProperty('items')) {
      field.items.forEach(item => {
        const itemField = { type: field.itemType, name: field.name, ...item }
        const itemNode = new Input(this.vm, createElement, itemField)
        children.push(itemNode.createElem([item.label]))
      })
    }
  }
}

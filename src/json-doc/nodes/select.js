import { Input } from './input'

export class Select extends Input {
  /**
   *
   */
  children() {
    const children = []
    const { createElement, field } = this
    if (!field.required) {
      const optionField = { type: field.itemType, name: field.name, ...{ value: '', label: '' } }
      const itemNode = new Input(this.vm, createElement, optionField)
      itemNode.options = attrOrProps => attrOrProps
      children.push(itemNode.createElem())
    }
    field.items.forEach(option => {
      const optionField = { type: field.itemType, name: field.name, ...option }
      const optionNode = new Input(this.vm, createElement, optionField)
      optionNode.options = attrOrProps => {
        if (field.itemVisible) {
          let optionVG = option.group + option.value
          if (field.itemVisible[optionVG] === false) {
            let classObj = { class: { 'hide': true } }
            Object.assign(attrOrProps, classObj)
          }
        }
        return attrOrProps
      }
      children.push(optionNode.createElem([option.label]))
    })
    return children
  }
}

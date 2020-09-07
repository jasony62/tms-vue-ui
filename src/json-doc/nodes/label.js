import { Node, components } from './index'
/**
 *
 */
export class LabelNode extends Node {
  constructor(vm, createElement, field) {
    super(vm, createElement, components.label)
    this.field = field
  }

  createElem(children = []) {
    const { createElement, field } = this
    const attrOrProps = this.attrOrProps(field, field)

    Object.assign(attrOrProps, { attrs: { 'schema-name': `${field.name}` } })

    if (field.visible === false) {
      let classObj = { class: { 'hide': true } }
      Object.assign(attrOrProps, classObj)
    }

    const element = createElement(this.rawArgs.tag, attrOrProps, children)

    return element
  }
}

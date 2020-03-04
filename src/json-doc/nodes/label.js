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

    const element = createElement(this.rawArgs.tag, attrOrProps, children)

    return element
  }
}

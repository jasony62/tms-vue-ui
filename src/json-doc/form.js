import { Node, components } from './node'
/**
 *
 */
export class FormNode extends Node {
  constructor(vm, createElement) {
    super(vm, createElement, components.form)
  }
  createElem(children = []) {
    const { vm } = this
    const { createElement } = this

    const attrOrProps = this.attrOrProps({
      autocomplete: vm.autocomplete,
      novalidate: vm.novalidate
    })

    const nodeOptions = {
      ref: '__form',
      on: {
        submit: event => {
          event.stopPropagation()
          vm.submit(event)
        },
        invalid: vm.invalid
      },
      ...attrOrProps
    }

    const element = createElement(this.rawArgs.tag, nodeOptions, children)

    return element
  }
}

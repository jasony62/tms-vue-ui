/**
 * 表单中的节点
 */
export class Node {
  constructor(vm, createElement, rawArgs) {
    this.vm = vm
    this.createElement = createElement
    this.rawArgs = rawArgs
  }
  /**
   * 指定的组件选项
   *
   * @param {Object} extendingOptions 节点上要添加的属性
   * @param {Object} field 表单控件
   * @param {Object} item 表单控件的子控件
   */
  attrOrProps(extendingOptions = {}, field = {}, item = {}) {
    const { option: rawOption } = this.rawArgs
    const attrName = rawOption.native ? 'attrs' : 'props'

    let options
    if (typeof rawOption === 'function') {
      options = rawOption({ vm: this.vm, field, item, h: this.createElement })
    } else {
      options = { ...rawOption, native: undefined }
    }

    return { [attrName]: { ...extendingOptions, ...options } }
  }

  createElem(children = []) {
    const { createElement } = this

    const attrOrProps = this.attrOrProps()

    const element = createElement(this.rawArgs.tag, attrOrProps, children)

    return element
  }
}

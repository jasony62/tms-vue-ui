const option = { native: true }
/**
 * 支持的组件类型
 */
export const components = {
  title: { tag: 'h1', option },
  description: { tag: 'p', option },
  error: { tag: 'div', option },
  form: { tag: 'form', option },
  label: { tag: 'label', option },
  input: { tag: 'input', option },
  textarea: { tag: 'textarea', option },
  radio: { tag: 'input', option },
  radiogroup: { tag: 'div', option },
  select: { tag: 'select', option },
  option: { tag: 'option', option },
  checkbox: { tag: 'input', option },
  checkboxgroup: { tag: 'div', option },
  file: { tag: 'input', option },
  button: {
    tag: 'button',
    option: {
      ...option,
      type: 'submit',
      label: 'Submit'
    }
  },
  jsondoc: { tag: 'tms-json-doc', option }
}
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
      options = rawOption({ vm: this.vm, field, item })
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

import { getChild } from './utils'
import { Node, components } from './node'

const option = { native: true }
const defaultInput = { tag: 'input', option }
const defaultGroup = { tag: 'div', option }

/**
 * 获得创建节点的原始参数
 *
 * @param {Object} field
 */
function getRawCreateArgs(field) {
  // 如果schema中指定了组件类型，直接使用
  const customComponent = field.component ? { tag: field.component, option: {} } : undefined
  // field对应的组件类型，指定or预制，有items的变成group组件
  const args = field.component
    ? customComponent
    : field.hasOwnProperty('items') && field.type !== 'select'
    ? components[`${field.type}group`] || defaultGroup
    : components[field.type] || defaultInput

  return args
}

/**
 * 表单中的模型属性节点包含value
 */
export class FieldNode extends Node {
  constructor(vm, createElement, field) {
    super(vm, createElement, getRawCreateArgs(field))
    this.field = field
  }
  /**
   * 初始值
   */
  fieldValue() {
    const { field } = this
    const fieldName = field.name
    const fieldValue = getChild(this.vm.editDoc, fieldName.split('.'))
    if (!field.value) {
      field.value = fieldValue
    }
    return fieldValue
  }
  children() {
    return []
  }
  createElem(children) {
    const { field, createElement } = this

    const attrOrProps = this.attrOrProps(field, field)

    const nodeOptions = this.options(attrOrProps)

    if (!Array.isArray(children)) children = this.children()

    const inputElement = createElement(this.rawArgs.tag, nodeOptions, children)

    return inputElement
  }
}

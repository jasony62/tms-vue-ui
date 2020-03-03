import { setVal, getChild } from './utils'
import { Node, components } from './node'
import { Input } from './input'
import { Textarea } from './textarea'
import { Select } from './select'
import { Checkboxgroup } from './checkboxgroup'
import { ArrayNode } from './array'
import { FormNode } from './form'
import { LabelNode } from './label'

function prepareFieldNode(vm, createElement, field) {
  switch (field.type) {
    case 'textarea':
      return new Textarea(vm, createElement, field)
    case 'select':
      return new Select(vm, createElement, field)
    case 'checkboxgroup':
      return new Checkboxgroup(vm, createElement, field)
    case 'array':
      return new ArrayNode(vm, createElement, field)
    default:
      return new Input(vm, createElement, field)
  }
}

/**
 * 创建编辑器
 */
class Creator {
  constructor(vm, createElement) {
    this.vm = vm
    this.createElement = createElement
  }
  createLabelAndDesc(field, inputElement) {
    const { vm, createElement } = this
    const formControlsNodes = []
    if (field.label) {
      const labelNode = new LabelNode(vm, createElement, field)
      const labelNodes = []
      if (components.label.option.native) {
        labelNodes.push(
          createElement(
            'span',
            {
              attrs: {
                'data-required-field': field.required ? 'true' : 'false'
              }
            },
            field.label
          )
        )
      }
      labelNodes.push(inputElement)
      if (field.description) {
        labelNodes.push(createElement('br'))
        labelNodes.push(createElement('small', field.description))
      }
      formControlsNodes.push(labelNode.createElem(labelNodes))
    } else {
      formControlsNodes.push(inputElement)
      if (field.description) {
        formControlsNodes.push(createElement('br'))
        formControlsNodes.push(createElement('small', field.description))
      }
    }
    return formControlsNodes
  }

  createWrappingClass(formNodes, formControlsNodes) {
    const { createElement } = this
    if (this.inputWrappingClass) {
      formNodes.push(
        createElement(
          'div',
          {
            class: this.inputWrappingClass
          },
          formControlsNodes
        )
      )
    } else {
      formControlsNodes.forEach(node => formNodes.push(node))
    }
  }

  createNodeByField(fields, key) {
    const { vm, createElement } = this
    const field = fields[key]
    const formNodes = [] // 当前form中的节点

    const node = prepareFieldNode(vm, createElement, field)
    const inputNode = node.createElem()

    const formControlsNodes = this.createLabelAndDesc(field, inputNode)

    this.createWrappingClass(formNodes, formControlsNodes)

    return formNodes[0]
  }

  /**
   * 按表单创建组件
   *
   * 执行的结果保留在formNode中，根表单放在root中，其他子表单放在自表单名命名（name）的对象中
   */
  createNodesByForm(formNode, fields, sub) {
    if (Object.keys(fields).length === 0) return

    // 引用formNode中的表单（root或嵌套表单），记录当前表单包含的节点
    let singleFormNodes = sub ? setVal(formNode, sub.pop(), {}) : formNode.root

    Object.keys(fields).forEach(key => {
      if (key.indexOf('$') === 0) return

      const field = fields[key]

      // 创建嵌套form中的节点
      if (field.$sub) {
        return this.createNodesByForm(formNode, field, sub ? [...sub, key] : [key])
      }
      // 创建节点
      singleFormNodes[key] = this.createNodeByField(fields, key, sub, formNode)
    })
  }
  /**
   * 将所有表单放入1个组件列表中
   *
   * 如果指定了表单标题，创建<div class="sub-title"></div>
   * 如果存在子表单，将它用<div class="sub"></div>包裹起来
   *
   */
  arrangeAllNode(formNode, fields, sub) {
    const { createElement } = this
    const nodes = []
    const subName = sub && sub.pop()
    if (fields.$title) {
      nodes.push(
        createElement(
          'div',
          {
            class: 'sub-title'
          },
          fields.$title
        )
      )
    }
    Object.keys(fields).forEach(key => {
      if (key.indexOf('$') === 0) return

      const field = fields[key]

      if (field.$sub) {
        // 子表单节点
        const subFormNodes = this.arrangeAllNode(formNode, field, sub ? [...sub, key] : [key])
        // 将子表单包裹起来
        nodes.push(
          createElement(
            'div',
            {
              class: 'sub'
            },
            subFormNodes
          )
        )
      } else if (subName) {
        // 子表单下的node
        nodes.push(getChild(formNode, subName.split('.'))[key])
      } else {
        // 根表单下的node
        nodes.push(formNode.root[key])
      }
    })

    return nodes
  }
  createFormButtons(allFormNodes) {
    const { vm, createElement } = this

    const labelNode = new Node(vm, createElement, components.label)

    const button = this.vm.$slots.hasOwnProperty('default')
      ? { component: this.vm.$slots.default, option: { native: true } }
      : components.button
    if (button.component instanceof Array) {
      allFormNodes.push(labelNode.createElem(button.component))
    } else {
      const buttonNode = new Node(vm, createElement, components.button)
      allFormNodes.push(labelNode.createElem([buttonNode.createElem()]))
    }
  }
  render() {
    const { vm, createElement } = this
    const { schema } = vm

    const nodesTopLevel = [] // 和form并列的节点
    if (schema.title) {
      nodesTopLevel.push(createElement(components.title.tag, schema.title))
    }
    if (schema.description) {
      nodesTopLevel.push(createElement(components.description.tag, schema.description))
    }
    if (vm.error) {
      const errorNodes = []
      if (components.error.option.native) {
        errorNodes.push(vm.error)
      }
      const errorNode = new Node(vm, createElement, components.error)
      nodesTopLevel.push(errorNode.createElem(errorNodes))
    }
    // 表单节点
    const formNode = {
      root: {} // 根表单
    }

    this.createNodesByForm(formNode, vm.fields)

    const formNodes = this.arrangeAllNode(formNode, vm.fields)

    const allFormNodes = [] //form内的所有节点，包括按钮
    allFormNodes.push(formNodes)

    if (vm.requireButtons) {
      this.createFormButtons(allFormNodes)
    }

    const formNode2 = new FormNode(vm, createElement)
    nodesTopLevel.push(formNode2.createElem(allFormNodes))

    return nodesTopLevel
  }
}

// 因为编辑器会嵌套，每个编辑器对应不同vm
let mapCreators = new Map()

/**
 * 渲染函数
 *
 * @param {*} vm
 * @param {*} createElement
 */
export default function(vm, createElement) {
  let creator = mapCreators.has(vm)
  if (!creator) creator = new Creator(vm, createElement)

  return creator.render()
}

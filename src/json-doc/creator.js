import { Node, prepareFieldNode, components, FormNode, LabelNode } from './nodes'
let _uid = 0
/**
 * 创建编辑器（一套schema的节点应该只创建一次，否则会多次render）
 */
class Creator {
  constructor(vm, createElement) {
    this._uid = ++_uid
    this.vm = vm
    this.createElement = createElement
  }
  createLabelAndDesc(field, fieldNode) {
    const { vm, createElement } = this
    if (field.label) {
      const labelNode = new LabelNode(vm, createElement, field)
      const labelNodes = []
      if (components.label.option.native) {
        labelNodes.push(
          createElement(
            'span',
            {
              attrs: {
                'data-required-field': field.required ? 'true' : 'false',
              },
            },
            field.label
          )
        )
      }
      labelNodes.push(fieldNode)
      if (field.description) {
        labelNodes.push(createElement('br'))
        labelNodes.push(createElement('small', field.description))
      }
      return labelNode.createElem(labelNodes)
    } else {
      const descNodes = []
      descNodes.push(fieldNode)
      if (field.description) {
        descNodes.push(createElement('br'))
        descNodes.push(createElement('small', field.description))
      }
      return createElement('div', descNodes)
    }
  }

  createWrapClass(labelAndDescNodes) {
    const { createElement } = this
    if (this.fieldWrapClass) {
      return createElement(
        'div',
        {
          class: this.fieldWrapClass,
        },
        labelAndDescNodes
      )
    }
    return labelAndDescNodes
  }
  /**
   * 创建字段的包裹节点，包括：包裹节点，label节点，description节点和字段节点
   *
   * @param {object} field
   */
  createFieldWrapNode(field) {
    const { vm, createElement } = this

    const node = prepareFieldNode(vm, createElement, field)
    const fieldNode = node.createElem()

    const labelAndDesc = this.createLabelAndDesc(field, fieldNode)

    return this.createWrapClass(labelAndDesc)
  }
  getNestFieldNodes(fieldNodes, nestPath) {
    if (!nestPath) return fieldNodes.root
    const sNestPath = nestPath.join('.')
    if (!fieldNodes[sNestPath]) fieldNodes[sNestPath] = {}
    return fieldNodes[sNestPath]
  }
  /**
   * 按嵌套关系，创建每个嵌套下的字段节点
   * 执行的结果保留在fieldNodes中，根表单放在root中，其他子表单放在自表单名命名（name）的对象中
   *
   * @param {object} fieldNodes 保存表单中的节点，嵌套节点和字段节点的对应关系
   * @param {objectt} fields 当前嵌套节点下的字段
   * @param {array} nestPath 当前嵌套节点的路径
   */
  createFieldNodes(fieldNodes, fields, nestPath) {
    if (Object.keys(fields).length === 0) return

    // 引用fieldNodes中的嵌套节点（root或嵌套节点），记录当前嵌套节点包含的节点
    let nestFieldNodes = this.getNestFieldNodes(fieldNodes, nestPath)

    Object.keys(fields).forEach((key) => {
      if (key.indexOf('$') === 0) return

      const field = fields[key]

      // 创建嵌套节点中的字段节点
      if (field.$sub) {
        return this.createFieldNodes(fieldNodes, field, nestPath ? [...nestPath, key] : [key])
      }
      // 创建本嵌套内的字段节点
      nestFieldNodes[key] = this.createFieldWrapNode(field)
    })
  }
  /**
   * 将所有表单放入1个组件列表中
   *
   * 如果指定了表单标题，创建<div class="sub-title"></div>
   * 如果存在子表单，将它用<div class="sub"></div>包裹起来
   *
   */
  createNestNodes(fieldNodes, nestField, nestPath) {
    const { createElement } = this
    const nestNode = []
    if (nestField.$title) {
      nestNode.push(
        createElement(
          'div',
          {
            class: 'nest-title',
          },
          nestField.$title
        )
      )
    }
    /**
     * 嵌套节点下的字段节点
     */
    Object.keys(nestField).forEach((key) => {
      if (key.indexOf('$') === 0) return

      const subField = nestField[key]

      if (subField.$sub) {
        // 嵌套节点下的字段节点
        const nestFieldNodes = this.createNestNodes(fieldNodes, subField, nestPath ? [...nestPath, key] : [key])
        // 将嵌套节点包裹起来
        nestNode.push(
          createElement(
            'div',
            {
              class: 'nest',
            },
            nestFieldNodes
          )
        )
      } else if (nestPath) {
        // 嵌套节点下的字段节点
        const subFieldNodes = this.getNestFieldNodes(fieldNodes, nestPath)
        if (subFieldNodes && subFieldNodes[key]) {
          nestNode.push(subFieldNodes[key])
        }
      } else {
        // 根表单下的node
        nestNode.push(fieldNodes.root[key])
      }
    })

    return nestNode
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
  createForm() {
    const { vm, createElement } = this
    const fieldNodes = {
      root: {},
    }
    // 创建单独的字段节点保留在fieldNodes中
    this.createFieldNodes(fieldNodes, vm.fields)

    const nestNodes = this.createNestNodes(fieldNodes, vm.fields)

    const formSubNode = [] //form内的所有节点，包括按钮
    formSubNode.push(nestNodes)

    if (vm.requireButtons) {
      this.createFormButtons(formSubNode)
    }

    const formNode = new FormNode(vm, createElement)

    return formNode.createElem(formSubNode)
  }
  render() {
    const { vm, createElement } = this
    const { schema } = vm

    const topNodes = []
    if (schema.title) {
      topNodes.push(createElement(components.title.tag, schema.title))
    }

    if (schema.description) {
      topNodes.push(createElement(components.description.tag, schema.description))
    }

    if (vm.error) {
      const errorNodes = []
      if (components.error.option.native) {
        errorNodes.push(vm.error)
      }
      const errorNode = new Node(vm, createElement, components.error)
      topNodes.push(errorNode.createElem(errorNodes))
    }

    topNodes.push(this.createForm())

    return topNodes
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
export default function (vm, createElement) {
  let creator = mapCreators.get(vm)
  if (!creator) {
    creator = new Creator(vm, createElement)
    mapCreators.set(vm, creator)
  }
  return creator.render()
}

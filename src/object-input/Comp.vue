<script>
import { Objarr } from './objarr'
import { Render } from '../utils'

const components = {
  button: {
    add: {
      component: 'button',
      options: { class: { 'tms-object-input__add': true } }
    },
    empty: {
      component: 'button',
      options: { class: { 'tms-object-input__empty': true } }
    },
    remove: {
      component: 'button',
      options: { class: { 'tms-object-input__line-remove': true } }
    },
    moveup: {
      component: 'button',
      options: { class: { 'tms-object-input__line-moveup': true } }
    },
    movedown: {
      component: 'button',
      options: { class: { 'tms-object-input__line-movedown': true } }
    }
  },
  layout: {
    root: {
      component: 'div',
      options: { class: { 'tms-object-input': true } }
    },
    lines: {
      component: 'div',
      options: { class: { 'tms-object-input__lines': true } }
    },
    line: {
      component: 'div',
      options: { class: { 'tms-object-input__line': true } }
    },
    'line-index': {
      component: 'div',
      options: { class: { 'tms-object-input__line-index': true } }
    },
    'line-key': {
      component: 'input',
      options: { class: { 'tms-object-input__line-key': true } }
    },
    'line-slot': {
      component: 'div',
      options: { class: { 'tms-object-input__line-slot': true } }
    },
    'line-buttons': {
      component: 'div',
      options: { class: { 'tms-object-input__line-buttons': true } }
    },
    bottom: {
      component: 'div',
      options: { class: { 'tms-object-input__bottom': true } }
    }
  }
}
/**
 * 数组中的一行
 */
function createLine(createElement, line, index, key) {
  const buttonNodes = []
  let { remove, moveup, movedown } = components.button
  buttonNodes.push(
    createElement(
      remove.component,
      {
        on: { click: evt => this.remove(evt, line, index, key) },
        ...remove.options
      },
      this.$slots.hasOwnProperty('remove') ? this.$slots.remove : '删除'
    )
  )
  if (index > 0) {
    buttonNodes.push(
      createElement(
        moveup.component,
        {
          on: { click: evt => this.moveUp(evt, line, index) },
          ...moveup.options
        },
        this.$slots.hasOwnProperty('moveup') ? this.$slots.moveup : '上移'
      )
    )
  }
  if (index < this.lines.length - 1) {
    buttonNodes.push(
      createElement(
        movedown.component,
        {
          on: { click: evt => this.moveDown(evt, line, index) },
          ...movedown.options
        },
        this.$slots.hasOwnProperty('movedown') ? this.$slots.movedown : '下移'
      )
    )
  }

  let { layout } = components
  const lineChildNodes = []
  if (this.isInputObject) {
    const lineKeyNode = createElement(layout['line-key'].component, {
      domProps: {
        value: key
      },
      props: {
        value: key
      },
      on: {
        input: event => {
          this.lines.rename(key, event.target.value)
        }
      },
      ...layout['line-key'].options
    })
    lineChildNodes.push(lineKeyNode)
  } else {
    const lineIndexNode = createElement(
      layout['line-index'].component,
      {
        ...layout['line-index'].options
      },
      index
    )
    lineChildNodes.push(lineIndexNode)
  }
  const lineSlotNode = createElement(
    layout['line-slot'].component,
    {
      ...layout['line-slot'].options
    },
    [
      this.$scopedSlots.hasOwnProperty('default')
        ? this.$scopedSlots.default({ line })
        : typeof this.slotRender === 'function'
        ? this.slotRender(createElement, { line })
        : line
    ]
  )
  lineChildNodes.push(lineSlotNode)
  const lineButtonsNode = createElement(
    layout['line-buttons'].component,
    {
      ...layout['line-buttons'].options
    },
    buttonNodes
  )
  lineChildNodes.push(lineButtonsNode)

  return Render.layered(
    createElement,
    layout.line.component,
    layout.line.options,
    lineChildNodes
  )
}
/**
 * 底部操作
 */
function createBottom(createElement) {
  let { bottom } = components.layout
  let { add, empty } = components.button
  return createElement(bottom.component, { ...bottom.component.options }, [
    createElement(
      add.component,
      {
        on: { click: this.emitAdd },
        ...add.options
      },
      this.$slots.hasOwnProperty('add') ? this.$slots.add : '添加'
    ),
    createElement(
      empty.component,
      {
        on: { click: this.empty },
        ...empty.options
      },
      this.$slots.hasOwnProperty('empty') ? this.$slots.empty : '清空'
    )
  ])
}

export default {
  name: 'TmsObjectInput',
  setComponent(typeDotName, component, options = {}) {
    let [type, name] = typeDotName.split('.')
    if (components[type] && components[type][name]) {
      let oldComp = components[type][name]
      let newComp = { component, options: { ...oldComp.options, ...options } }
      components[type][name] = newComp
    }
  },
  props: {
    value: { type: [Array, Object], required: true },
    slotRender: [Function]
  },
  data() {
    const lines =
      typeof this.value === 'object'
        ? new Objarr(this.value, {
            defineProperty: (target, property, value) => {
              this.$set(target, property, value)
            },
            deleteProperty: (target, property) => {
              this.$delete(target, property)
            }
          })
        : null

    const isInputObject = Array.isArray(this.value) === false

    return {
      lines,
      isInputObject
    }
  },
  methods: {
    emitAdd() {
      this.$emit('add', (newLine, key) => {
        this.lines.append(newLine, key)
      })
    },
    empty() {
      //this.lines.splice(0)
    },
    remove(evt, line, index, key) {
      if (this.isInputObject) {
        delete this.lines[key]
        this.$forceUpdate()
      } else this.lines.splice(index, 1)
    },
    moveUp(evt, line, index) {
      if (index === 0) return
      this.lines.move(index, -1)
    },
    moveDown(evt, line, index) {
      if (index === this.lines.length - 1) return
      this.lines.move(index, 1)
    }
  },
  render(createElement) {
    console.log('ObjectInput.render', this._uid)
    if (!this.lines) {
      return createElement('div', [
        `[ObjectInput-${this._uid}]: 传入的的属性（value）为空`
      ])
    }
    const nodes = []
    let { layout } = components
    let linesNode = createElement(
      layout.lines.component,
      { ...layout.lines.options },
      this.lines.map((line, index) =>
        createLine.call(
          this,
          createElement,
          line,
          index,
          this.lines.findIndexKey(index)
        )
      )
    )
    nodes.push(linesNode)

    nodes.push(createBottom.call(this, createElement))

    return createElement(
      layout.root.component,
      { ...layout.root.options },
      nodes
    )
  }
}
</script>
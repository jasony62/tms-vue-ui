<script>
const components = {
  button: {
    add: {
      component: 'button',
      options: { class: { 'tms-array-input__add': true } }
    },
    empty: {
      component: 'button',
      options: { class: { 'tms-array-input__empty': true } }
    },
    remove: {
      component: 'button',
      options: { class: { 'tms-array-input__line-remove': true } }
    },
    moveup: {
      component: 'button',
      options: { class: { 'tms-array-input__line-moveup': true } }
    },
    movedown: {
      component: 'button',
      options: { class: { 'tms-array-input__line-movedown': true } }
    }
  },
  layout: {
    root: {
      component: 'div',
      options: { class: { 'tms-array-input': true } }
    },
    lines: {
      component: 'div',
      options: { class: { 'tms-array-input__lines': true } }
    },
    line: {
      component: 'div',
      options: { class: { 'tms-array-input__line': true } }
    },
    'line-slot': {
      component: 'div',
      options: { class: { 'tms-array-input__line-slot': true } }
    },
    'line-buttons': {
      component: 'div',
      options: { class: { 'tms-array-input__line-buttons': true } }
    },
    bottom: {
      component: 'div',
      options: { class: { 'tms-array-input__bottom': true } }
    }
  }
}
/**
 * 数组中的一行
 */
function createLine(createElement, line, index) {
  const buttonNodes = []
  let { remove, moveup, movedown } = components.button
  buttonNodes.push(
    createElement(
      remove.component,
      {
        on: { click: evt => this.remove(evt, line, index) },
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
  return createElement(layout.line.component, { ...layout.line.options }, [
    createElement(
      layout['line-slot'].component,
      {
        ...layout['line-slot'].options
      },
      [
        this.$scopedSlots.hasOwnProperty('default')
          ? this.$scopedSlots.default({ line })
          : line
      ]
    ),
    createElement(
      layout['line-buttons'].component,
      {
        ...layout['line-buttons'].options
      },
      buttonNodes
    )
  ])
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
        on: { click: this.add },
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
  name: 'TmsArrayInput',
  setComponent(typeDotName, component, options = {}) {
    let [type, name] = typeDotName.split('.')
    if (components[type] && components[type][name]) {
      let oldComp = components[type][name]
      let newComp = { component, options: { ...oldComp.options, ...options } }
      components[type][name] = newComp
    }
  },
  props: {
    lines: { type: Array, default: () => [] }
  },
  data() {
    return {}
  },
  methods: {
    add() {
      this.$emit('add')
    },
    empty() {
      this.lines.splice(0)
    },
    remove(evt, line, index) {
      this.lines.splice(index, 1)
    },
    moveUp(evt, line, index) {
      if (index === 0) return
      this.lines.splice(index, 1)
      this.lines.splice(index - 1, 0, line)
    },
    moveDown(evt, line, index) {
      if (index === this.lines.length - 1) return
      this.lines.splice(index, 1)
      this.lines.splice(index + 1, 0, line)
    }
  },
  render(createElement) {
    const nodes = []
    let { layout } = components
    const linesNode = createElement(
      layout.lines.component,
      { ...layout.lines.options },
      this.lines.map((line, index) =>
        createLine.call(this, createElement, line, index)
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
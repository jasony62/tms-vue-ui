function addStyleClass(obj, prop, styleClass) {
  if (undefined === obj[prop]) {
    obj[prop] = [styleClass]
  } else if (Array.isArray(obj[prop])) {
    if (!obj[prop].includes(styleClass)) obj[prop].push(styleClass)
  } else if (typeof obj[prop] === 'object') {
    obj[prop][styleClass] = true
  } else if (typeof obj[prop] === 'string') {
    let regx = new RegExp(styleClass)
    if (!regx.test(obj[prop])) obj[prop] += ` ${styleClass}`
  }
  return obj
}

export default function(Vue) {
  Vue.component('tms-flex', {
    props: {
      direction: { type: String, default: 'row' },
      elasticItems: { type: Array }
    },
    render(h) {
      let classes = ['tms-flex']
      classes.push(this.direction === 'column' ? 'tms-flex_column' : 'tms-flex_row')
      let items = this.$slots.default
      if (items && items.length) {
        items.forEach((item, index) => {
          if (undefined === item.data) item.data = {}
          addStyleClass(item.data, 'class', 'tms-flex__item')
          if (this.elasticItems && this.elasticItems.length && this.elasticItems.includes(index)) {
            addStyleClass(item.data, 'class', 'tms-flex__item_elastic')
          }
        })
      }
      return h('div', { class: classes }, items)
    }
  })
}

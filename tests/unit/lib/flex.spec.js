import Vue from 'vue'
import Flex from '@/lib/flex'
Vue.use(Flex)

import { mount } from '@vue/test-utils'

describe('flex', () => {
  it('渲染组件-默认', () => {
    const wrapper = mount(Vue.component('tms-flex'))
    expect(wrapper.html()).toBe('<div class="tms-flex tms-flex_row"></div>')
    wrapper.destroy()
  })
  it('渲染组件-垂直排列', () => {
    const wrapper = mount(Vue.component('tms-flex'), { propsData: { direction: 'column' } })
    expect(wrapper.html()).toBe('<div class="tms-flex tms-flex_column"></div>')
    wrapper.destroy()
  })
  it('渲染组件-指定占据剩余空间的子元素', () => {
    const comp = Vue.component('test', {
      render(h) {
        return h('tms-flex', { props: { elasticItems: [1] } }, [h('div'), h('div'), h('div')])
      }
    })
    const wrapper = mount(comp)
    expect(wrapper.html()).toBe(
      '<div class="tms-flex tms-flex_row"><div class="tms-flex__item"></div><div class="tms-flex__item tms-flex__item_elastic"></div><div class="tms-flex__item"></div></div>'
    )
    wrapper.destroy()
  })
  it('渲染组件-嵌套', () => {
    const comp = Vue.component('test', {
      render(h) {
        return h('tms-flex', [h('div'), h('tms-flex', { props: { direction: 'column' } })])
      }
    })
    const wrapper = mount(comp)
    expect(wrapper.html()).toBe(
      '<div class="tms-flex tms-flex_row"><div class="tms-flex__item"></div><div class="tms-flex tms-flex_column tms-flex__item"></div></div>'
    )
    wrapper.destroy()
  })
})

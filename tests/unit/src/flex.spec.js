import Vue from 'vue'
import Flex from '@/src/flex'
Vue.use(Flex)

import { mount } from '@vue/test-utils'

describe('flex', () => {
  it('渲染组件-默认', () => {
    const wrapper = mount(Vue.component('tms-flex'))
    expect(wrapper.html()).toBe('<div class="tms-flex tms-flex_row tms-flex_gap_2"></div>')
    wrapper.destroy()
  })
  it('渲染组件-垂直排列', () => {
    const wrapper = mount(Vue.component('tms-flex'), { propsData: { direction: 'column' } })
    expect(wrapper.html()).toBe('<div class="tms-flex tms-flex_column tms-flex_gap_2"></div>')
    wrapper.destroy()
  })
  it('渲染组件-给子元素添加类', () => {
    const comp = Vue.component('test', {
      render(h) {
        return h('tms-flex', [
          h('div'),
          h('div', { class: { 'tms-flex__item': true } }),
          h('div', { class: ['tms-flex__item'] }),
          h('div', { class: 'tms-flex__item' })
        ])
      }
    })
    const wrapper = mount(comp)
    expect(wrapper.html()).toBe(
      '<div class="tms-flex tms-flex_row tms-flex_gap_2"><div class="tms-flex__item"></div><div class="tms-flex__item"></div><div class="tms-flex__item"></div><div class="tms-flex__item"></div></div>'
    )
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
      '<div class="tms-flex tms-flex_row tms-flex_gap_2"><div class="tms-flex__item"></div><div class="tms-flex__item tms-flex__item_elastic"></div><div class="tms-flex__item"></div></div>'
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
      '<div class="tms-flex tms-flex_row tms-flex_gap_2"><div class="tms-flex__item"></div><div class="tms-flex tms-flex_column tms-flex_gap_2 tms-flex__item"></div></div>'
    )
    wrapper.destroy()
  })
})

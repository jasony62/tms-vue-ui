import Vue from 'vue'
import Flex from '@/src/flex'
import Card from '@/src/card'
Vue.use(Flex).use(Card)

import { mount } from '@vue/test-utils'

describe('card', () => {
  it('渲染组件-默认', () => {
    const wrapper = mount(Vue.component('tms-card'), {
      propsData: { thumb: '/images/123.jpg', title: 'test-title', desc: 'test-desc' }
    })
    expect(wrapper.html()).toBe(
      '<div class="tms-card"><main><div class="tms-flex tms-flex_row"><div class="tms-card__thumb tms-flex__item"><img src="/images/123.jpg"></div><div class="tms-flex__item tms-flex__item_elastic"><div class="tms-flex tms-flex_column"><div class="tms-card__title tms-flex__item">test-title</div><div class="tms-card__desc tms-flex__item tms-flex__item_elastic">test-desc</div></div></div></div></main></div>'
    )
    wrapper.destroy()
  })
  it('渲染组件-头部和脚部插槽', () => {
    const wrapper = mount(Vue.component('tms-card'), {
      propsData: { thumb: '/images/123.jpg', title: 'test-title', desc: 'test-desc' },
      slots: {
        header: 'tms-card-header',
        footer: 'tms-card-footer'
      }
    })
    expect(wrapper.html()).toBe(
      '<div class="tms-card"><header>tms-card-header</header><main><div class="tms-flex tms-flex_row"><div class="tms-card__thumb tms-flex__item"><img src="/images/123.jpg"></div><div class="tms-flex__item tms-flex__item_elastic"><div class="tms-flex tms-flex_column"><div class="tms-card__title tms-flex__item">test-title</div><div class="tms-card__desc tms-flex__item tms-flex__item_elastic">test-desc</div></div></div></div></main><footer>tms-card-footer</footer></div>'
    )
    wrapper.destroy()
  })
  it('渲染组件-标题和描述插槽', () => {
    const wrapper = mount(Vue.component('tms-card'), {
      propsData: { thumb: '/images/123.jpg', title: '', desc: '' },
      slots: {
        title: '<h3>test-title</h3>',
        desc: '<div style="color: red;">test-desc</div>'
      }
    })
    expect(wrapper.html()).toBe(
      '<div class="tms-card"><main><div class="tms-flex tms-flex_row"><div class="tms-card__thumb tms-flex__item"><img src="/images/123.jpg"></div><div class="tms-flex__item tms-flex__item_elastic"><div class="tms-flex tms-flex_column"><div class="tms-card__title tms-flex__item"><h3>test-title</h3></div><div class="tms-card__desc tms-flex__item tms-flex__item_elastic"><div style="color: red;">test-desc</div></div></div></div></div></main></div>'
    )
    wrapper.destroy()
  })
  it('渲染组件-底部插槽', () => {
    const wrapper = mount(Vue.component('tms-card'), {
      propsData: { thumb: '/images/123.jpg', title: 'test-title', desc: 'test-desc' },
      slots: {
        bottom: 'test-bottom'
      }
    })
    expect(wrapper.html()).toBe(
      '<div class="tms-card"><main><div class="tms-flex tms-flex_row"><div class="tms-card__thumb tms-flex__item"><img src="/images/123.jpg"></div><div class="tms-flex__item tms-flex__item_elastic"><div class="tms-flex tms-flex_column"><div class="tms-card__title tms-flex__item">test-title</div><div class="tms-card__desc tms-flex__item tms-flex__item_elastic">test-desc</div><div class="tms-card__bottom tms-flex__item">test-bottom</div></div></div></div></main></div>'
    )
    wrapper.destroy()
  })
})

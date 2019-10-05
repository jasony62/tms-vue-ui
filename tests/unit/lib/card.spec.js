import Vue from 'vue'
import Flex from '@/lib/flex'
import Card from '@/lib/card'
Vue.use(Flex).use(Card)

import { mount } from '@vue/test-utils'

describe('card', () => {
  it('渲染组件-默认', () => {
    const wrapper = mount(Vue.component('tms-card'), {
      propsData: { thumb: '/images/123.jpg', title: 'test-title', desc: 'test-desc' }
    })
    expect(wrapper.html()).toBe(
      '<div class="tms-card"><main><div class="tms-flex tms-flex_row"><div class="tms-flex__item"><img src="/images/123.jpg"></div><div class="tms-flex__item tms-flex__item_elastic"><div class="tms-flex tms-flex_column"><div class="tms-card__title tms-flex__item">test-title</div><div class="tms-card__desc tms-flex__item tms-flex__item_elastic">test-desc</div></div></div></div></main></div>'
    )
    wrapper.destroy()
  })
})

<template>
  <tms-frame id="app" header-color="#f00" left-width="10%" right-width="10%" :display-sm="{ header: true, right: true }" main-direction-sm="column-reverse">
    <template v-slot:header>
      <div>this is header section</div>
    </template>
    <template v-slot:center>
      <router-view />
    </template>
    <template v-slot:left>
      <div id="nav">
        <tms-flex direction="column">
          <router-link to="/">首页</router-link>
          <router-link to="/layout">布局组件</router-link>
          <router-link to="/login">登录框</router-link>
          <router-link to="/array-input">数组输入框</router-link>
          <router-link to="/json-schema">JSON定义</router-link>
          <router-link to="/json-doc">JSON文档</router-link>
        </tms-flex>
      </div>
    </template>
    <template v-slot:right>
      <div>this is right section</div>
    </template>
    <template v-slot:footer>
      <div style="height:100px">this is footer section</div>
    </template>
  </tms-frame>
</template>

<script>
import Vue from 'vue'
import { Frame, Flex } from '@/lib'
import '@/lib/frame/style'
import '@/lib/flex/style'

Vue.use(Frame).use(Flex)
/**
 * 初始化全局组件TmsArrayInput
 */
import { Button, InputNumber } from 'element-ui'
//import { ArrayInput } from '@/lib'
import { ArrayInput } from '../src'

Vue.use(Button).use(InputNumber)

ArrayInput.setComponent('layout.root', 'tms-flex', {
  props: { direction: 'column' }
})
ArrayInput.setComponent('layout.lines', 'tms-flex', {
  props: { direction: 'column' }
})
ArrayInput.setComponent('layout.line', 'tms-flex')
ArrayInput.setComponent('button.add', 'el-button', {
  props: { type: 'primary' }
})
ArrayInput.setComponent('button.empty', 'el-button', {
  props: { type: 'danger' }
})
ArrayInput.setComponent('button.remove', 'el-button', {
  props: { size: 'mini', icon: 'el-icon-minus' }
})
ArrayInput.setComponent('button.moveup', 'el-button', {
  props: { size: 'mini', icon: 'el-icon-caret-top' }
})
ArrayInput.setComponent('button.movedown', 'el-button', {
  props: { size: 'mini', icon: 'el-icon-caret-bottom' }
})
Vue.use(ArrayInput)

export default {
  name: 'app'
}
</script>

<style lang="less">
.tms-frame__main__center {
  padding: 8px;
}
</style>

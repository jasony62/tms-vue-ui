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

export default {
  name: 'app'
}
</script>

<style lang="less">
.tms-frame__main__center {
  padding: 8px;
}
</style>

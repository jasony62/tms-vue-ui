<template>
  <tms-frame
    id="app"
    header-color="#f00"
    left-width="15%"
    :display-sm="{header:true,right:true}"
    main-direction-sm="column-reverse"
  >
    <template v-slot:header>
      <div>this is header section</div>
    </template>
    <template v-slot:center>
      <HelloTmsUI />
    </template>
    <template v-slot:left>
      <div>this is left section</div>
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
import { Frame } from '@/lib'
import '@/lib/frame/style'
Vue.use(Frame)

import HelloTmsUI from './components/HelloTmsUI.vue'

export default {
  name: 'app',
  components: {
    HelloTmsUI
  }
}
</script>

<style lang='less'>
.tms-frame__main__center {
  padding: 8px;
}
</style>

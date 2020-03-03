<template>
  <div id="myLogin">
    <button @click="showLoginDialog">函数方式调用登录框</button>
    <div>
      <p>页面引入组件方式调用登录框：</p>
      <tms-login :on-success="fnSuccessToken" :on-fail="fnFailToken"></tms-login>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Login } from '../../lib'
import '../../lib/login/style'

import { getCaptcha, getToken, loginDataSchema } from './login'

Vue.use(Login, {
  schema: loginDataSchema,
  fnGetCaptcha: getCaptcha,
  fnGetToken: getToken
})

export default {
  name: 'LoginUi',
  methods: {
    showLoginDialog() {
      const login = new Login(loginDataSchema, getCaptcha, getToken)
      login.showAsDialog(this.user).then(this.fnSuccessToken)
    },
    fnSuccessToken(token) {
      console.log('已获得token:' + token)
    },
    fnFailToken(msg) {
      console.log(msg)
    }
  }
}
</script>

<style lang="less">
#myLogin {
  width: 350px;
  margin: 0 auto;
  padding: 10px;
  background-color: #f5f5f5;
}
</style>

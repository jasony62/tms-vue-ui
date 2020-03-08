import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LayoutUi from '../views/LayoutUi.vue'
import LoginUi from '../views/LoginUi.vue'
import JsonSchemaUi from '../views/JsonSchemaUi.vue'
import JsonDocUi from '../views/JsonDocUi.vue'
import ObjectInputUi from '../views/ObjectInputUi.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/layout',
    name: 'layout',
    component: LayoutUi
  },
  {
    path: '/login',
    name: 'login',
    component: LoginUi
  },
  {
    path: '/object-input',
    name: 'object-input',
    component: ObjectInputUi
  },
  {
    path: '/json-schema',
    name: 'json-schema',
    component: JsonSchemaUi
  },
  {
    path: '/json-doc',
    name: 'json-doc',
    component: JsonDocUi
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router

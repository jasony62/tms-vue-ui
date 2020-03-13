<template>
  <div id="myJsonDoc">
    <tms-el-json-doc :schema="schema" :doc="model" v-on:submit="jsonDocSubmit"></tms-el-json-doc>
  </div>
</template>

<script>
import Vue from 'vue'
import schema from '../vue-route-schema'
//import { ObjectInput, JsonDoc, ElJsonDoc } from '@/lib'
import { ObjectInput, JsonDoc, ElJsonDoc } from '../../src'

Vue.component('tms-object-input', ObjectInput)
JsonDoc.setComponent('array', 'tms-object-input')
JsonDoc.setComponent('object', 'tms-object-input')

Vue.component('tms-el-json-doc', ElJsonDoc)
export default {
  name: 'HelloTmsUI',
  data() {
    return {
      schema,
      model: {}
    }
  },
  methods: {
    jsonDocSubmit(newModel) {
      alert(JSON.stringify(newModel))
      console.log(JSON.stringify(newModel))
    }
  }
}
</script>

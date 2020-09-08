<template>
  <div id="myJsonDoc">
    <tms-el-json-doc :is-submit="isSubmit" :schema="schema" :doc="model" :on-file-submit="handleFileSubmit" v-on:submit="jsonDocSubmit" :on-axios="handleAxios"></tms-el-json-doc>
  </div>
</template>

<script>
import Vue from 'vue'
import schema from '../demo-schema'
import { ObjectInput, JsonDoc, ElJsonDoc } from '../../src'
import { TmsAxiosPlugin } from 'tms-vue'

Vue.component('tms-object-input', ObjectInput)
JsonDoc.setComponent('array', 'tms-object-input')
JsonDoc.setComponent('object', 'tms-object-input')

Vue.component('tms-el-json-doc', ElJsonDoc)

Vue.use(TmsAxiosPlugin)
export default {
  name: 'HelloTmsUI',
  data() {
    return {
      isSubmit: false,
      schema,
      model: { areaCode: '010' }
    }
  },
  methods: {			
    jsonDocSubmit(newSlimModel, newModel) {
      this.isSubmit = true
      setTimeout(() => {
        alert(JSON.stringify(newModel))
        console.log(newSlimModel)
        this.isSubmit = false
      }, 2000)
		},
		handleFileSubmit(ref, files) {
			let result = {}
			result[ref] = files.map(file => {
				return {'name': file.name, 'url': location.href}
			})
			return Promise.resolve(result)
    },
    handleAxios() {    
      return Vue.TmsAxios()
    }
  }
}
</script>

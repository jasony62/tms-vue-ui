<template>
  <div id="myJsonDoc">
    <tms-el-json-doc :schema="schema" :doc="model" :on-file-submit="handleFileSubmit" v-on:submit="jsonDocSubmit"></tms-el-json-doc>
  </div>
</template>

<script>
import Vue from 'vue'
import schema from '../demo-schema'
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
      model: {file1: [{name: '1.jpg'}]}
    }
	},
  methods: {			
    jsonDocSubmit(newSlimModel, newModel) {
      alert(JSON.stringify(newModel))
      console.log(newSlimModel)
		},
		handleFileSubmit(ref, files) {
			let result = {}
			result[ref] = files.map(file => {
				return {'name': file.name, 'url': location.href}
			})
			return Promise.resolve(result)
		}
  }
}
</script>

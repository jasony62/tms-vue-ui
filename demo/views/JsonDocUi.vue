<template>
  <div id="myJsonDoc">
    <tms-el-json-doc :schema="schema" :doc="model" :on-file-submit="handleFileSubmit" v-on:submit="jsonDocSubmit"></tms-el-json-doc>
  </div>
</template>

<script>
import Vue from 'vue'
import schema from '../vue-route-schema'
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
		},
		async handleFileSubmit(ref, files) {
			let fileName, fileUrl;
			Object.entries(this.schema.properties[ref].items.properties).forEach(([key, value]) => {
				if (value.format==='filename') {
					fileName = key
				}
				if (value.format==='fileurl') {
					fileUrl = key
				}
			})

			let result = [], i = 0;
			function doRequest (file) {
				return new Promise ((resolve, reject) => {
					setTimeout(() => {
						resolve({[fileName]: file.name, [fileUrl]: location.href})
					}, 0)
				});
			} 
			while(i < files.length) {
				const allContent = await doRequest(files[i])
				result.push(allContent)
				i++
			}
			return Promise.resolve(result)
		}
  }
}
</script>

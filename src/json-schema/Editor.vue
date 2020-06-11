<template>
  <tms-flex>
    <el-tree :data="data" :props="defaultProps" default-expand-all :expand-on-click-node="false" @node-click="onNodeClick" draggable :allow-drag="allowDrag" :allow-drop="allowDrop" @node-drop="onDragNode"></el-tree>
    <el-form label-width="80px" :model="form">
      <el-form-item label="键值">
        <el-input v-model="form.key" @change="onChangeKey" :disabled="!form.node"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.schema.type" placeholder="请选择类型" @change="onChangeType" :disabled="!form.node">
          <el-option label="integer" value="integer"></el-option>
          <el-option label="number" value="number"></el-option>
          <el-option label="string" value="string"></el-option>
          <el-option label="object" value="object"></el-option>
          <el-option label="array" value="array"></el-option>
          <el-option label="boolean" value="boolean"></el-option>
          <el-option label="null" value="null"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.schema.title" :disabled="!form.node"></el-input>
      </el-form-item>
			<el-form-item label="描述">
        <el-input type="textarea" v-model="form.schema.description" :disabled="!form.node"></el-input>
      </el-form-item>
      <el-form-item label="形式" v-if="form.schema.type === 'array'">
        <el-select v-model="form.schema.format" placeholder="请选择形式" :disabled="!form.node" @change="onChangeSelect">
          <el-option label="文件" value="file"></el-option>
          <el-option label="多选框" value="checkbox"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="形式" v-if="form.schema.type === 'string'">
        <el-radio-group v-model="form.schema.radioType" :disabled="!form.node" @change="onChangeRadio">
          <el-radio :label="1">输入框</el-radio>
          <el-radio :label="2">单选框</el-radio>
        </el-radio-group>
      </el-form-item>
			<el-form-item label="默认值" v-if="form.schema.type === 'string' || (form.schema.type === 'array' && form.schema.format === 'checkbox')">
        <template v-if="form.schema.radioType===1">
          <el-input v-model="form.schema.default" :disabled="!form.node"></el-input>
        </template>
				<template v-else-if="form.schema.radioType === 2 || form.schema.format === 'checkbox'">
          <tms-flex v-for="(v, i) in form.schema[currentFormat]" :key="i">
            <el-input size="mini" v-model="v.value" @input="onSetValue(v.value, i)" :disabled="v.disabled"></el-input>
            <el-input size="mini" v-model="v.label" @input="onSetLabel(v.label, i)"></el-input>
            <el-button size="mini" type="text" @click="onDelOption(v, i)">删除</el-button>
          </tms-flex>
          <el-button size="mini"  type="primary" @click="onAddOption" :disabled="!form.node">新增选项</el-button>
        </template>
			</el-form-item>
			<el-form-item label="不可修改" v-if="form.schema.type === 'string' && form.schema.radioType===1">
				<el-switch v-model="form.schema.disabled" :disabled="!form.node"></el-switch>
			</el-form-item>
			<el-form-item label="文件类型" v-if="form.schema.type === 'object' && form.schema.attrs">
				<el-input v-model="form.schema.attrs.accept" placeholder="标准格式,如'image/png,image/jpeg'" :disabled="!form.node"></el-input>
			</el-form-item>
			<el-form-item label="文件最大" v-if="form.schema.type === 'object' && form.schema.attrs">
				<el-input v-model="form.schema.attrs.size" placeholder="请输入数字,默认以MB为单位" :disabled="!form.node"></el-input>
			</el-form-item>
			<el-form-item label="文件个数" v-if="form.schema.type === 'object' && form.schema.attrs">
				<el-input v-model="form.schema.attrs.limit" placeholder="请输入数字,0无意义" :disabled="!form.node"></el-input>
			</el-form-item>
			<el-form-item label="必填" v-if="form.schema.type !== 'object'">
				<el-switch v-model="form.schema.required" :disabled="!form.node"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" @click="onRemoveNode" :disabled="!form.node">删除</el-button>
        <el-button size="mini" @click="onAppendNode" v-if="form.schema.type === 'object' || (form.schema.type === 'array'&&form.schema.format==='file')">添加属性</el-button>
      </el-form-item>
    </el-form>
    <div style="flex:1">{{jsonString}}</div>
  </tms-flex>
</template>
<script>
import Vue from 'vue'
import { Tree, Form, FormItem, Input, Select, Option, Button, Switch, Radio, RadioGroup } from 'element-ui'
Vue.use(Tree)
Vue.use(Form)
  .use(FormItem)
  .use(Input)
  .use(Select)
  .use(Option)
	.use(Button)
	.use(Switch)
	.use(Radio)
	.use(RadioGroup)
class SchemaWrap {
  /**
   *
   * @param {*} key
   * @param {Object} schema
   */
  constructor(key, schema, parent) {
    this.key = key
    this.label = key
    this.schema = schema
    this.parent = parent
  }
  appendChild(child) {
		this.children.push(child)
		this.schema.type==='object' ? Vue.set(this.schema.properties, child.key, child.schema) : Vue.set(this.schema, child.key, child.schema)
    child.parent = this
  }
}
SchemaWrap.build = function(key, schema, parent) {
  let wrap = new SchemaWrap(key, schema, parent)
  switch (schema.type) {
    case 'object':
      if (typeof schema.properties === 'object') {
				wrap.children = Object.entries(schema.properties).map(([k, s]) => {
					if (schema.required && schema.required.includes(k)) {
						s.required = true
					}
          return SchemaWrap.build(k, s, wrap)
				})
      }
      break
    case 'array':
			if (typeof schema.items === 'object') {
				wrap.children = Object.entries(schema).filter(([k]) => {
					return k === 'items'
				}).map(([k, s]) => {
					return SchemaWrap.build(k, s, wrap)
				})
      }
      break
  }
  return wrap
}

class FormData {
  constructor() {
    this.reset()
  }
  reset() {
    this.key = ''
    this.schema = { title: '', type: 'string', description: '', radioType: 1, required: false }
    this.node = null
  }
}
export default {
  name: 'tms-json-schema',
  props: ['schema'],
  data() {
    return {
      form: new FormData(),
			data: [],
			isParentArray: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      jsonString: '',
      currentFormat: 'oneOf'
    }
  },
  watch: {
    schema: {
      handler: function(val) {
        this.jsonString = typeof val === 'object' ? JSON.stringify(val) : '{}'
      },
      deep: true,
      immediate: true
		},
		"form.schema.type": {
			handler: function(val) {
				const currentSchema = this.form.schema
				switch(val) {
					case 'string':
						!currentSchema.hasOwnProperty('radioType') && Vue.set(currentSchema, 'radioType', 1)
						break;
					default:
						if (currentSchema.hasOwnProperty('radioType')) delete currentSchema.radioType
						break;
				}
			}
    },
    "form.schema.radioType": {
			handler: function(val) {
        this.currentFormat = 'oneOf'
      },
      immediate: true
    },
    "form.schema.format": {
			handler: function(val) {
        if (val === 'checkbox') {
          this.currentFormat = 'anyOf'
        } else {
          this.$delete(this.form.schema, 'anyOf')
        }
      },
      immediate: true
    }
  },
  methods: {
    onChangeSelect(format) {
      if(format === 'checkbox' & !this.form.schema.anyOf) {
        this.$set(this.form.schema, 'anyOf', [{"label": "选项1", "value": "a"}, {"label": "选项2", "value": "b"}])
      }
    },
    onChangeRadio(label){
      if (label === 1) {
        this.$delete(this.form.schema, this.currentFormat)
      }else if(label === 2 && !this.form.schema.oneOf){
        this.$delete(this.form.schema, 'anyOf')
        this.$delete(this.form.schema, 'format')
        this.$set(this.form.schema, 'oneOf', [{"label": "选项1", "value": "a"}, {"label": "选项2", "value": "b"}])
      }
    },
    onAddOption(){
      this.form.schema[this.currentFormat].push({"label": "新选项", "value": "newKey"})
    },
    onDelOption(v, i){
      this.form.schema[this.currentFormat].splice(i, 1)
    },
    onSetValue(v, i){
      let item = this.form.schema[this.currentFormat][i]
      item['value'] = v
      this.$set(this.form.schema[this.currentFormat], i, item)
    },
    onSetLabel(v, i){
      let item = this.form.schema[this.currentFormat][i]
      item['label'] = v
      this.$set(this.form.schema[this.currentFormat], i, item)
    },
    onDragNode(draggingNode, dropNode){
      let children = dropNode.data.parent.children
      let { properties}  = this.schema
      let newProperties = {}
      children.map(d=>{
        newProperties[d.key] = properties[d.key]
      })
      dropNode.data.parent.schema.properties = newProperties
    },
    allowDrop(draggingNode, dropNode, type){
      if(draggingNode.level === dropNode.level){
        return type === 'prev' || type === 'next'
      } else {
        return false
      }
    },
    allowDrag (draggingNode) {
      return draggingNode.level === 2
    },
    onNodeClick(schemaWrap, node) {
      if (!schemaWrap.schema.radioType && schemaWrap.schema.type ==='string') 
      this.$set(schemaWrap.schema, 'radioType', 1)
      this.form.key = schemaWrap.key
      this.form.schema = schemaWrap.schema
      this.form.node = node
      setTimeout(() => {
        if(this.form.schema[this.currentFormat]) {
          this.form.schema[this.currentFormat].map(ele => {
            this.$set(ele, 'disabled', true)
            return ele
          })
        }
      }, 0)
    },
    onChangeKey() {
      const schemaWrap = this.form.node.data
      if (this.form.key !== schemaWrap.key) {
        const newKey = this.form.key
        if (schemaWrap.parent && schemaWrap.parent.schema.properties) {
          this.$delete(schemaWrap.parent.schema.properties, schemaWrap.key)
          this.$set(
            schemaWrap.parent.schema.properties,
            newKey,
            schemaWrap.schema
          )
        }
        schemaWrap.label = schemaWrap.key = newKey
      }
    },
    onChangeType(type){
      const schemaWrap = this.form.node.data
      if (!schemaWrap.schema.radioType && type === 'string') {
        this.$set(schemaWrap.schema, 'radioType', 1)
        this.$delete(schemaWrap.schema, 'format')
        this.$delete(schemaWrap.schema, 'anyOf')
      } else if(type === 'array'){
        this.$delete(schemaWrap.schema, 'radioType')
        this.$delete(schemaWrap.schema, 'oneOf')
      }
    },
    onAppendNode() {
			const data = this.form.node.data
			let newChild
      if (!Array.isArray(data.children)) {
        this.$set(data, 'children', [])
			}
			if (data.schema.type === 'object') {
				if (
					typeof data.schema.properties !== 'object' ||
					Array.isArray(data.schema.properties)
				) {
					this.$set(data.schema, 'properties', {})
				}
				newChild = new SchemaWrap('newKey', { type: 'string', radioType: 1 })
			}
			if (data.schema.type === 'array') {
				newChild = new SchemaWrap('items', { type: 'object', attrs: {} })
			}
			data.appendChild(newChild)
		},
    onRemoveNode() {
      const { parent, data } = this.form.node
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.key === data.key)
      children.splice(index, 1)
      const properties = parent.data.schema.properties
      properties && this.$delete(properties, data.key)
      this.form.reset()
    }
  },
  mounted() {
		const root = SchemaWrap.build('root', this.schema)
    this.data = [root]
    
  }
}
</script>

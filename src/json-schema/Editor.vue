<template>
  <tms-flex>
    <el-tree :data="data" :props="defaultProps" default-expand-all :expand-on-click-node="false" @node-click="onNodeClick" draggable :allow-drag="allowDrag" :allow-drop="allowDrop" @node-drop="onDragNode"></el-tree>
    <el-form label-width="80px" :model="form">
      <el-form-item label="键值">
        <el-input v-model="form.key" @change="onChangeKey" :disabled="!form.node"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.schema.type" placeholder="请选择类型" :disabled="!form.node">
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
			<el-form-item label="必填" v-if="form.schema.type !== 'object'">
				<el-switch v-model="form.schema.required" :disabled="!form.node"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" @click="onRemoveNode" :disabled="!form.node">删除</el-button>
        <el-button size="mini" @click="onAppendNode" v-if="form.schema.type === 'object'">添加属性</el-button>
      </el-form-item>
    </el-form>
    <div>{{jsonString}}</div>
  </tms-flex>
</template>
<script>
import Vue from 'vue'
import { Tree, Form, FormItem, Input, Select, Option, Button, Switch } from 'element-ui'
Vue.use(Tree)
Vue.use(Form)
  .use(FormItem)
  .use(Input)
  .use(Select)
  .use(Option)
	.use(Button)
	.use(Switch)
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
    Vue.set(this.schema.properties, child.key, child.schema)
    child.parent = this
  }
}
SchemaWrap.build = function(key, schema, parent) {
  const wrap = new SchemaWrap(key, schema, parent)
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
    this.schema = { title: '', type: 'string', description: '', required: false }
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      jsonString: ''
    }
  },
  watch: {
    schema: {
      handler: function(val) {
        this.jsonString = typeof val === 'object' ? JSON.stringify(val) : '{}'
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
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
      this.form.key = schemaWrap.key
      this.form.schema = schemaWrap.schema
      this.form.node = node
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
    onAppendNode() {
      const data = this.form.node.data
      if (!Array.isArray(data.children)) {
        this.$set(data, 'children', [])
      }
      if (
        typeof data.schema.properties !== 'object' ||
        Array.isArray(data.schema.properties)
      ) {
        this.$set(data.schema, 'properties', {})
      }
      const newChild = new SchemaWrap('newKey', { type: 'string' })
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

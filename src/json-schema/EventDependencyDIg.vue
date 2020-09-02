<template>
  <el-dialog title="设置事件依赖关系" :close-on-click-modal="false" :visible="visible" :before-close="onCancel" width="50%">
    <el-form label-position="left" label-width="80px">
      <el-form-item label="属性">
        <el-select v-model="property" filterable placeholder="请选择">
          <el-option v-for="(prop,key) in properties" :key="key" :label="key" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="rule.url"></el-input>
      </el-form-item>
      <el-form-item label="参数">
        <el-select v-model="rule.properties" multiple filterable placeholder="请选择">
          <el-option v-for="(prop,key) in properties" :key="key" :label="key" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结果">
        <el-select v-model="rule.type" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Vue from 'vue'

/* 组件定义 */
const DlgComponent = {
  props: {
    properties: { type: Object },
  },
  data() {
    return {
      visible: true,
      property: 'file',
      rule: {},
      options: [{
        value: 'v1',
        label: '作为可选项'
      }]
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    onClose() {
      this.$emit('close')
    },
    showAsEventDialog(schema, property, config) {     
      let { rule } = config || {}
      this.properties = schema.properties
      this.property = property
      if (rule && typeof rule === 'object')
        this.$set(this.rule, rule)
      this.$mount()
      document.body.appendChild(this.$el)
      return new Promise((resolve) => {
        this.$once('close', () => {
          this.visible = false         
          document.body.removeChild(this.$el)
          resolve({
            property: this.property,
            rule: this.rule,
          })
        })
        this.$once('cancel', () => {
          this.visible = false
          document.body.removeChild(this.$el)
          resolve(false)
        })
      })
    },
  },
}
/* 作为独组件打开 */
export function showAsEventDialog(schema, property, rule) {
  let dialog = new Vue(DlgComponent)  
  return dialog.showAsEventDialog(schema, property, rule)
}

export default DlgComponent
</script>
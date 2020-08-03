<template>
  <el-dialog title="设置属性依赖关系" :visible="visible" :before-close="onCancel" width="50%">
    <el-form label-position="left" label-width="80px">
      <el-form-item label="依赖属性">
        <el-select v-model="property" placeholder="请选择">
          <el-option v-for="(prop,key) in properties" :key="key" :label="key" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="依赖规则">
        <el-form :inline="true" v-for="rule in rules" :key="rule.property" size="medium">
          <el-form-item label="属性">
            <el-select v-model="rule.property" placeholder="请选择">
              <el-option v-for="(prop,key) in properties" :key="key" :label="key" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="取值">
            <el-input v-model="rule.value"></el-input>
          </el-form-item>
          <el-button @click="onDelRule(rule)">删除</el-button>
        </el-form>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="operator">
          <el-radio label="and">满足全部条件</el-radio>
          <el-radio label="or">满足任意条件</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onAddRule">添加规则</el-button>
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
      rules: [],
      operator: 'and',
    }
  },
  methods: {
    onAddRule() {
      this.rules.push({ property: '', value: null })
    },
    onDelRule(rule) {
      let index = this.rules.indexOf(rule)
      this.rules.splice(index, 1)
    },
    onCancel() {
      this.$emit('cancel')
    },
    onClose() {
      this.$emit('close')
    },
    showAsDialog(schema, property, config) {
      let { rules, operator } = config || {}
      this.properties = schema.properties
      this.property = property
      if (rules && typeof rules === 'object')
        for (let property in rules) {
          let rule = { property, value: rules[property] }
          this.$set(this.rules, this.rules.length, rule)
        }
      this.operator = /and|or/.test(operator) ? operator : 'and'
      this.$mount()
      document.body.appendChild(this.$el)
      return new Promise((resolve) => {
        this.$once('close', () => {
          this.visible = false
          document.body.removeChild(this.$el)
          resolve({
            property: this.property,
            rules: this.rules,
            operator: this.operator,
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
export function showAsDialog(schema, property, rules) {
  let dialog = new Vue(DlgComponent)
  return dialog.showAsDialog(schema, property, rules)
}

export default DlgComponent
</script>
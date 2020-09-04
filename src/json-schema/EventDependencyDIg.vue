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
      <el-form-item label="发送格式">
        <el-tag v-for="wrap in rule.wraps" :key="wrap" closable :disable-transitions="false" @close="removeTag(rule.wraps, wrap)">{{wrap}}</el-tag>
        <el-input v-if="wrapInputVisible" class="input-new-tag" v-model="wrapInputValue" ref="wrapSaveInput" size="small" @keyup.enter.native="confirmTag('wrap',rule.wraps)" @blur="confirmTag('wrap',rule.wraps)"></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="addTag('wrap')">添加</el-button>
      </el-form-item>
      <el-form-item label="参数">
        <el-select v-model="rule.params" multiple filterable placeholder="请选择">
          <el-option v-for="(prop,key) in properties" :key="key" :label="key" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接收格式">
        <el-tag v-for="result in rule.results" :key="result" closable :disable-transitions="false" @close="removeTag(rule.results, result)">{{result}}</el-tag>
        <el-input v-if="resultInputVisible" class="input-new-tag" v-model="resultInputValue" ref="resultSaveInput" size="small" @keyup.enter.native="confirmTag('result',rule.results)" @blur="confirmTag('result',rule.results)"></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="addTag('result')">添加</el-button>
      </el-form-item>
      <el-form-item label="返回值">
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
      wrapInputVisible: false,
      wrapInputValue: '',
      resultInputVisible: false,
      resultInputValue: '',
      rule: {
        wraps: [],
        results: []
      },
      options: [
        {
          value: 'v1',
          label: '作为填入值'
        },{
          value: 'v2',
          label: '作为可选项'
        }
      ]
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    onClose() {
      this.$emit('close')
    },
    removeTag(tags, tag) {
      tags.splice(tags.indexOf(tag), 1);
    },
    addTag(type) {
      this[type + 'InputVisible'] = true;
      this.$nextTick(() => {
        this.$refs[type + 'SaveInput'].$refs.input.focus();
      });
    },
    confirmTag(type, tags) {
      let inputValue = this[type + 'InputValue'];
      if (inputValue) {
        tags.push(inputValue);
      }
      this[type + 'InputVisible'] = false;
      this[type + 'InputValue'] = '';
    },
    showAsEventDialog(schema, property, config) {     
      let { rule } = config || {}
      this.properties = schema.properties
      this.property = property
      if (rule && typeof rule === 'object')
        for (let property in rule) {
          this.$set(this.rule, property, rule[property])
        }
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
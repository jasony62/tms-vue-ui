<template>
  <div id="app">
    <el-form-item label="依赖规则">
      {{tabName}}
      <el-form :inline="true" v-for="(rule,index) in dependencyRules[tabName]['rules']" :key="index" size="medium">
        <el-form-item label="属性">
          <el-select v-model="rule.property" filterable placeholder="请选择">
            <el-option v-for="(prop,key) in properties" :key="key" :label="key" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="取值">
          <el-input v-model="rule.value"></el-input>
        </el-form-item>
        <el-button @click="onDelRule(rule, tabName)">删除</el-button>
      </el-form>
    </el-form-item>
    <el-form-item>
      <el-radio-group v-model="dependencyRules[tabName]['operator']">
        <el-radio label="and">满足全部条件</el-radio>
        <el-radio label="or">满足任意条件</el-radio>
      </el-radio-group>
    </el-form-item>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="onAddRule(tabName)">添加规则</el-button>
    </span>
  </div>
</template>

<script>
  // import Vue from 'vue'

  /* 组件定义 */
  export default {
    data(){
      return {
      timer: ''
    }
  },
    props: {
      properties: Object,
      dependencyRules: Object,
      tabName: String
    },
    methods: {
      onAddRule(tabName) {
        this.$set(this.dependencyRules[tabName]['rules'], this.dependencyRules[tabName]['rules'].length, { property: '', value: null })
      },
      onDelRule(rule, tabName) {
        console.log('rulerulerule', rule)
        let index = this.dependencyRules[tabName].rules.indexOf(rule)
        // let index = this.rules.indexOf(rule)
        this.dependencyRules[tabName].rules.splice(index, 1)
      }
    }
  }
</script>
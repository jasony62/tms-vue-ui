<template>
  <el-dialog title="设置属性依赖关系" :close-on-click-modal="false" :visible="visible" :before-close="onCancel" width="50%">
    <el-form label-position="left" label-width="80px">
      <el-form-item label="依赖属性">
        <el-select v-model="property" filterable placeholder="请选择">
          <el-option v-for="(prop,key) in properties" :key="key" :label="key" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <div style="margin-bottom: 20px;">
        <el-button size="small" @click="addTab(editableTabsValue)">
          添加分组
        </el-button>
      </div>
      <el-tabs v-model="editableTabsValue" tab-position="left" closable @tab-remove="removeTab">
        <el-tab-pane v-for="(item) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
          <tab-component :onCancel="onCancel" :onClose="onClose" :tabName="item.name || activeTag"
            :dependencyRules="dependencyRules" :properties="properties"></tab-component>
        </el-tab-pane>
      </el-tabs>
      <el-radio-group style="margin-top: 20px;" v-model="operator">
        <el-radio label="and">满足全部条件</el-radio>
        <el-radio label="or">满足任意条件</el-radio>
      </el-radio-group>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import Vue from 'vue'
  const Group = () => import('./Group')
  Vue.component('tab-component', Group)
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
        dependencyRules: {},
        operator: 'and',
        editableTabsValue: '1',
        editableTabs: [],
        tabIndex: 0,
        activeTag: '',
        newTabName: ''
      }
    },
    methods: {
      addTab() {
        const newTabName = ++this.tabIndex + ''
        // let newTabName = 'group' + newTagIndex;
        this.newTabName = newTabName
        this.editableTabs.push({
          title: 'group',
          name: newTabName
        });
        this.editableTabsValue = newTabName;
        this.$set(this.dependencyRules, newTabName, {
          rules: [], operator: 'and'
        })
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          })
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        delete this.dependencyRules[targetName]
      },
      onCancel() {
        this.$emit('cancel')
      },
      onClose() {
        this.$emit('close')
      },
      showAsDialog(schema, property, config) {
        let { dependencyRules, operator } = config || {}
        this.properties = schema.properties
        this.property = property
        if (dependencyRules && typeof dependencyRules === 'object') {
          this.tabIndex = Object.keys(dependencyRules).length
          Object.keys(dependencyRules).forEach((item, i) => {
            console.log('showAsDialog', dependencyRules[item], item, i)
            this.$set(this.dependencyRules, (i+1)+'', dependencyRules[item])
            this.editableTabs.push({
              title: 'group',
              name: (i + 1)+''
            })
          })
          this.editableTabsValue = '1'
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
              dependencyRules: this.dependencyRules,
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
  export function showAsDialog(schema, property, dependencyRules) {
    let dialog = new Vue(DlgComponent)
    return dialog.showAsDialog(schema, property, dependencyRules)
  }

export default DlgComponent
</script>
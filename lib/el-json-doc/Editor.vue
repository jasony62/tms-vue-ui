<template>
  <tms-json-doc ref="TmsJsonDoc" :schema="schema" v-model="editingDoc" :require-buttons="requireButtons" :one-way="false">
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button type="reset" @click="reset">重置</el-button>
  </tms-json-doc>
</template>
<script>
import Vue from 'vue'
import TmsJsonDoc from '../json-doc/Editor.vue'
import {
  Form,
  FormItem,
  Input,
  Alert,
  Radio,
  Checkbox,
  Option,
  Rate,
  ColorPicker,
  Switch,
  Col,
  Row,
  Card,
  CheckboxGroup,
  InputNumber,
  Button
} from 'element-ui'
Vue.use(Form)
  .use(FormItem)
  .use(Input)
  .use(Alert)
  .use(Radio)
  .use(Checkbox)
  .use(Option)
  .use(Rate)
  .use(ColorPicker)
  .use(Switch)
  .use(Col)
  .use(Row)
  .use(Card)
  .use(CheckboxGroup)
  .use(InputNumber)
  .use(Button)

TmsJsonDoc.setComponent('form', 'el-form', ({ vm }) => {
  // vm is the JsonDoc VM

  const labelWidth = '120px'
  const model = vm.editing(false)
  const rules = {}

  function parseField(fields) {
    Object.keys(fields).forEach(key => {
      if (key.indexOf('$') === 0 && key !== '$sub') return
      const field = fields[key]
      if (field.$sub) {
        return parseField(field)
      }
      if (!field.name) return

      // http://element.eleme.io/#/en-US/component/form#validation
      rules[field.name] = []
      const type =
        field.schemaType === 'array' && field.type === 'radio'
          ? 'string'
          : field.schemaType
      const required = field.required
      const message = field.title
      const trigger = ['radio', 'checkbox', 'select'].includes(field.type)
        ? 'change'
        : 'blur'
      rules[field.name].push({ type, required, message, trigger })

      if (field.minlength !== undefined || field.maxlength !== undefined) {
        const max = field.maxlength || 255
        const min = field.minlength || 0
        const msg = `长度必须在${min}和${max}之间`
        rules[field.name].push({ min, max, message: msg, trigger })
      }
    })
  }

  parseField(vm.fields)

  // returning the form props
  return { labelWidth, rules, model }
})

// http://element.eleme.io/#/en-US/component/form#validation
TmsJsonDoc.setComponent('label', 'el-form-item', ({ field }) => ({
  prop: field.name
}))

TmsJsonDoc.setComponent('email', 'el-input')
TmsJsonDoc.setComponent('url', 'el-input')
TmsJsonDoc.setComponent('number', 'el-input-number')
TmsJsonDoc.setComponent('text', 'el-input')
TmsJsonDoc.setComponent('textarea', 'el-input')
TmsJsonDoc.setComponent('checkbox', 'el-checkbox', ({ field }) => ({
  label: field.value
}))
TmsJsonDoc.setComponent('checkboxgroup', 'el-checkbox-group')
TmsJsonDoc.setComponent('radio', 'el-radio', ({ field }) => ({
  label: field.value
}))
TmsJsonDoc.setComponent('select', 'el-select')
TmsJsonDoc.setComponent('switch', 'el-switch')
TmsJsonDoc.setComponent('color', 'el-color-picker')
TmsJsonDoc.setComponent('rate', 'el-rate')

// You can also use the component object
TmsJsonDoc.setComponent('option', 'el-option', ({ field }) => ({
  value: field.value,
  label: field.label
}))

// By default `<h1/>` is used to render the form title.
// To override this, use the `title` type:
TmsJsonDoc.setComponent('title', 'h2')

// By default `<p/>` is used to render the form title.
// To override this, use the `description` type:
TmsJsonDoc.setComponent('description', 'small')

// By default `<div/>` is used to render the message error.
// To override this, use the `error` type:
TmsJsonDoc.setComponent('error', 'el-alert', ({ vm }) => ({
  type: 'error',
  title: vm.error
}))

TmsJsonDoc.setComponent('jsondoc', 'tms-el-json-doc')

export default {
  name: 'TmsElJsonDoc',
  components: { TmsJsonDoc },
  props: {
    schema: { type: Object },
    doc: { type: Object },
    requireButtons: { type: Boolean, default: () => true },
    oneWay: { type: Boolean, default: () => true }
  },
  data() {
    return {
      editingDoc: {}
    }
  },
  created() {
    if (this.oneWay === false) this.editingDoc = this.doc
    else this.editingDoc = this.doc ? this.doc : {}
  },
  methods: {
    submit() {
      const tmsJsonDoc = this.$refs.TmsJsonDoc
      tmsJsonDoc.form().validate(valid => {
        if (valid) {
          this.$emit('submit', this.editingDoc)
          tmsJsonDoc.clearErrorMessage()
        } else {
          tmsJsonDoc.setErrorMessage('请填写必填字段')
          return false
        }
      })
    },
    reset() {
      this.$refs.TmsJsonDoc.reset()
    }
  }
}
</script>
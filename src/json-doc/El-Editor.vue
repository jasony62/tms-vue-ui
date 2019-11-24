<template>
  <tms-json-doc ref="TmsJsonDoc" :schema="schema" v-model="model">
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button type="reset" @click="reset">重置</el-button>
  </tms-json-doc>
</template>
<script>
import Vue from 'vue'
import TmsJsonDoc from './Editor.vue'
import {
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
  InputNumber
} from 'element-ui'
Vue.use(Radio)
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

TmsJsonDoc.setComponent('form', 'el-form', ({ vm }) => {
  // vm is the JsonDoc VM

  const labelWidth = '120px'
  const model = vm.data
  const rules = {}

  function parseField(fields) {
    Object.keys(fields).forEach(key => {
      if (key.indexOf('$') === 0 && key !== '$sub') return
      const field = fields[key]
      if (field.$sub) {
        return parseField(field)
      }
      if (!field.name) return
      rules[field.name] = []
      // http://element.eleme.io/#/en-US/component/form#validation
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
        const msg = `Length must between ${min} and ${max}`
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
TmsJsonDoc.setComponent('checkbox', 'el-checkbox')
TmsJsonDoc.setComponent('checkboxgroup', 'el-checkbox-group')
TmsJsonDoc.setComponent('radio', 'el-radio')
TmsJsonDoc.setComponent('select', 'el-select')
TmsJsonDoc.setComponent('switch', 'el-switch')
TmsJsonDoc.setComponent('color', 'el-color-picker')
TmsJsonDoc.setComponent('rate', 'el-rate')

// You can also use the component object
TmsJsonDoc.setComponent('option', Option)

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
export default {
  components: { TmsJsonDoc },
  props: ['schema', 'model'],
  methods: {
    submit() {
      this.$refs.TmsJsonDoc.form().validate(valid => {
        if (valid) {
          // this.model contains the valid data according your JSON Schema.
          // You can submit your model to the server here
          this.$emit('submit', this.model)
          this.$refs.TmsJsonDoc.clearErrorMessage()
        } else {
          this.$refs.TmsJsonDoc.setErrorMessage(
            'Please fill out the required fields'
          )
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
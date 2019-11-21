<template>
  <el-row>
    <el-col :span="12">
      <el-card class="form">
        <tms-json-doc ref="JsonDoc" :schema="schema" v-model="model">
          <el-button type="primary" @click="submit">Subscribe</el-button>
          <el-button type="reset" @click="reset">Reset</el-button>
        </tms-json-doc>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Model</span>
        </div>
        <pre class="json">{{ jsonString }}</pre>
      </el-card>
      <br />
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>How to use</span>
        </div>
        <div class="json">
          <p>GitHub: <a href="https://github.com/yourtion/vue-json-ui-editor" target="_blank">vue-json-ui-editor</a></p>
          <p>NPM: <a href="https://www.npmjs.com/package/vue-json-ui-editor" target="_blank">json-editor</a></p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Vue from 'vue'
import { TmsJsonDoc } from '../../lib'
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
      const type = field.schemaType === 'array' && field.type === 'radio' ? 'string' : field.schemaType
      const required = field.required
      const message = field.title
      const trigger = ['radio', 'checkbox', 'select'].includes(field.type) ? 'change' : 'blur'
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
  data: () => ({
    schema: require('../newsletter'),
    model: {
      name: 'Yourtion',
      sub: {
        sEmail: 'yourtion@gmail.com'
      }
    }
  }),
  computed: {
    jsonString() {
      return JSON.stringify(this.model, null, 2).trim()
    }
  },
  methods: {
    submit() {
      this.$refs.TmsJsonDoc.form().validate(valid => {
        if (valid) {
          // this.model contains the valid data according your JSON Schema.
          // You can submit your model to the server here

          // eslint-disable-next-line no-console
          console.log('model', JSON.stringify(this.model))
          this.$refs.TmsJsonDoc.clearErrorMessage()
        } else {
          this.$refs.TmsJsonDoc.setErrorMessage('Please fill out the required fields')
          return false
        }
      })
    },
    reset() {
      this.$refs.TmsJsonDoc.reset()
    }
  },
  components: { TmsJsonDoc }
}
</script>

<style>
.form {
  text-align: left;
  width: 90%;
  margin: auto;
}

h2 {
  font-size: 1.7em;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0.2em;
}

h2 + small {
  display: block;
  text-align: center;
  margin-bottom: 1.2em;
}

small {
  line-height: 20px;
  display: block;
}

.el-alert {
  margin-bottom: 15px;
}

.el-form .sub {
  margin-left: 10%;
}

.json {
  text-align: left;
}
</style>

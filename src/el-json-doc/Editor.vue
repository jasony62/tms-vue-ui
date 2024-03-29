<template>
  <tms-json-doc
    ref="TmsJsonDoc"
    :schema="schema"
    v-model="editingDoc"
    :require-buttons="requireButtons"
    :one-way="false"
    :on-axios="onAxios"
    :on-file-download="onFileDownload"
  >
    <el-button type="primary" :loading="isSubmit" @click="submit">提交</el-button>
    <el-button type="reset" @click="reset">重置</el-button>
  </tms-json-doc>
</template>
<script>
import Vue from 'vue'
import TmsJsonDoc from '../json-doc/Editor.vue'
import { JsonSchema } from '../utils'
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
  Button,
  Upload,
  DatePicker,
  Link,
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
  .use(Upload)
  .use(DatePicker)
  .use(Link)
import './index.css'

TmsJsonDoc.setComponent('form', 'el-form', ({ vm }) => {
  // vm is the JsonDoc VM

  const labelWidth = '120px'
  const model = vm.editing(false)
  const rules = {}

  function parseField(fields) {
    Object.keys(fields).forEach((key) => {
      if (key.indexOf('$') === 0 && key !== '$sub') return
      const field = fields[key]
      if (field.$sub) {
        return parseField(field)
      }
      if (!field.name) return

      // http://element.eleme.io/#/en-US/component/form#validation
      rules[field.name] = []
      const type = field.schemaType === 'array' && field.type === 'radio' ? 'string' : field.schemaType
      const required = field.required
      let message = `${field.label}必填`
      const trigger = ['radio', 'checkbox', 'select', 'radiogroup', 'checkboxgroup'].includes(field.type)
        ? 'change'
        : 'blur'
      if (field.schemaType === 'array') {
        const len = model[key].length
        const max = field.schema.maxItems
        const min = field.schema.minItems || 0
        if (field.required) {
          if (field.schema.minItems !== undefined) {
            message = len < min ? `选项不得少于${min}项` : ''
          }
        }
        if (field.schema.maxItems !== undefined) {
          message = len > max ? `选项不得超过${max}项` : ''
        }
        rules[field.name].push({ min, max, type, required, message, trigger })
      } else {
        rules[field.name].push({ type, required, message, trigger })
      }

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
  prop: field.name,
}))

TmsJsonDoc.setComponent('email', 'el-input')
TmsJsonDoc.setComponent('dateTime', 'el-date-picker', () => ({
  type: 'datetime',
  valueFormat: 'yyyy-MM-dd HH:mm:ss',
}))
TmsJsonDoc.setComponent('a', 'el-link')
TmsJsonDoc.setComponent('url', 'el-input')
TmsJsonDoc.setComponent('number', 'el-input-number')
TmsJsonDoc.setComponent('text', 'el-input')
TmsJsonDoc.setComponent('textarea', 'el-input', () => ({
  autosize: { minRows: 2, maxRows: 4 },
}))
TmsJsonDoc.setComponent('checkbox', 'el-checkbox', ({ field }) => ({
  label: field.value,
}))
TmsJsonDoc.setComponent('checkboxgroup', 'el-checkbox-group')
TmsJsonDoc.setComponent('radio', 'el-radio', ({ field }) => ({
  label: field.value,
}))
TmsJsonDoc.setComponent('select', 'el-select', () => ({
  filterable: true,
}))
TmsJsonDoc.setComponent('switch', 'el-switch')
TmsJsonDoc.setComponent('color', 'el-color-picker')
TmsJsonDoc.setComponent('rate', 'el-rate')

// You can also use the component object
TmsJsonDoc.setComponent('option', 'el-option', ({ field }) => ({
  value: field.value,
  label: field.label,
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
  title: vm.error,
}))

TmsJsonDoc.setComponent('file', 'el-upload', ({ vm, field }) => ({
  action: '',
  autoUpload: false,
  fileList: field.value,
  accept: field.accept ? field.accept : '',
  limit: field.limit,
  onExceed: () => {
    const message = `文件总数不能超过 ${field.limit} 个`
    vm.error = message
  },
  onChange: (file, fileList) => {
    function errorFile(file, files) {
      files.forEach((item, index) => {
        if (item.name === file.name && item.status === 'ready') {
          files.splice(index, 1)
        }
      })
      return false
    }
    let isExist = null
    isExist = vm.editDoc[field.name].filter((item) => item.name === file.name)
    if (isExist.length) {
      vm.error = `文件已被选取,请重命名该文件再上传`
      return errorFile(file, fileList)
    }
    const index = file.raw.name.lastIndexOf('.')
    const suffix = file.raw.name.substr(index + 1)
    const isAccept = field.accept ? field.accept.replace(/\s*/g, '').split(',').includes(suffix) : true
    if (!isAccept) {
      vm.error = `文件上传失败,只能上传${field.accept}格式的文件`
      return errorFile(file, fileList)
    }
    const isLtSize = Number(field.size) * 1024 * 1024 < file.raw.size
    if (isLtSize) {
      vm.error = `文件上传失败,大小不能超过${field.size}M`
      return errorFile(file, fileList)
    }
    vm.editDoc[field.name].push(file.raw)
  },
  onRemove: (file) => {
    vm.editDoc[field.name].splice(vm.editDoc[field.name].indexOf(file), 1)
  },
}))

TmsJsonDoc.setComponent('button', 'el-button')

TmsJsonDoc.setComponent('jsondoc', 'tms-el-json-doc')

export default {
  name: 'TmsElJsonDoc',
  components: { TmsJsonDoc },
  props: {
    isSubmit: { type: Boolean, default: false },
    schema: { type: Object },
    doc: { type: Object },
    requireButtons: { type: Boolean, default: () => true },
    oneWay: { type: Boolean, default: () => true },
    onFileSubmit: { type: Function },
    onAxios: { type: Function },
    onFileDownload: { type: Function },
  },
  data() {
    return {
      editingDoc: {},
    }
  },
  computed: {
    fileSchemas() {
      return Object.keys(this.schema.properties).filter((key) => {
        const value = this.schema.properties[key]
        if (value.type === 'array' && value.items && value.items.format === 'file') return key
      })
    },
    jsonSchemas() {
      return Object.keys(this.schema.properties).filter((key) => {
        const value = this.schema.properties[key]
        if (value.type === 'json') return key
      })
    },
  },
  created() {
    if (this.oneWay === false) this.editingDoc = this.doc
    else this.editingDoc = this.doc ? this.doc : {}

    if (this.jsonSchemas.length && JSON.stringify(this.editingDoc) !== '{}') {
      this.doStringifyJson()
    }
  },
  methods: {
    doFile() {
      const tmsJsonDoc = this.$refs.TmsJsonDoc
      let promises = this.fileSchemas.map((schema) => {
        const values = this.editingDoc[schema]
        return this.onFileSubmit(schema, values)
          .then((doc) => {
            Object.assign(this.editingDoc, doc)
            return Promise.resolve()
          })
          .catch((err) => Promise.reject(err))
      })
      Promise.all(promises)
        .then(() => this.doSubmit())
        .catch((err) => tmsJsonDoc.setErrorMessage('文件上传出错' + err))
    },
    doStringifyJson() {
      this.jsonSchemas.forEach((schema) => {
        this.editingDoc[schema] = JSON.stringify(this.editingDoc[schema])
      })
    },
    doParseJson() {
      this.jsonSchemas.forEach((schema) => {
        this.editingDoc[schema] = JSON.parse(this.editingDoc[schema])
      })
    },
    doSubmit() {
      const tmsJsonDoc = this.$refs.TmsJsonDoc
      tmsJsonDoc.form().validate((valid) => {
        if (valid) {
          if (this.jsonSchemas.length) this.doParseJson()

          this.$emit('submit', JsonSchema.slim(this.schema, this.editingDoc), this.editingDoc)
          tmsJsonDoc.clearErrorMessage()
        } else {
          tmsJsonDoc.setErrorMessage('请填写必填字段')
          return false
        }
      })
    },
    submit() {
      this.fileSchemas.length ? this.doFile() : this.doSubmit()
    },
    reset() {
      this.$refs.TmsJsonDoc.reset()
    },
  },
}
</script>

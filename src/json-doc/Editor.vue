<script>
import { Parser } from './parser'
import { initChild, getChild, deepClone } from './utils'
import { components } from './nodes'
import CreateEditor from './creator'

/**
 * Json文档编辑器
 */
export default {
  name: 'TmsJsonDoc',
  model: {
    prop: 'value',
    event: 'none'
  },
  props: {
    /**
     * The JSON Schema object. Use the `v-if` directive to load asynchronous schema.
     */
    schema: { type: Object, required: true },
    /**
     * Use this directive to create two-way data bindings with the component. It automatically picks the correct way to update the element based on the input type.
     * @model
     * @default {}
     */
    value: { type: Object, default: () => ({}) },
    /**
     * This property indicates whether the value of the control can be automatically completed by the browser. Possible values are: `off` and `on`.
     */
    autoComplete: { type: String },
    /**
     * This Boolean attribute indicates that the form is not to be validated when submitted.
     */
    noValidate: { type: Boolean },
    /**
     * Define the inputs wrapping class. Leave `undefined` to disable input wrapping.
     */
    fieldWrapClass: { type: String },
    /**
     * 是否需要显示表单按钮
     */
    requireButtons: { type: Boolean, default: () => true },
    /**
     * 传入数据不能被修改
     */
    oneWay: { type: Boolean, default: () => true }
  },
  data() {
    const editDoc = this.oneWay === false ? this.value : deepClone(this.value)
    const fields = Parser.parse(this, editDoc, deepClone(this.schema))
    const defaultDoc = deepClone(editDoc)
    return {
      fields,
      defaultDoc,
      editDoc,
      error: null
    }
  },
  render(createElement) {
    console.log('Editor.render', this._uid)
    const nodes = CreateEditor(this, createElement)
    return createElement('div', nodes)
  },
  mounted() {
    // ??? 为什么
		//this.reset()
  },
  setComponent(type, tag, option = {}) {
    components[type] = { tag, option }
  },
  methods: {
    /**
     * Get a form input reference
     */
    input(name) {
      if (!this.$refs[name]) {
        throw new Error(`Undefined input reference '${name}'`)
      }
      return this.$refs[name][0]
    },
    /**
     * Get the form reference
     */
    form() {
      return this.$refs.__form
    },
    /**
     * Checks whether the form has any constraints and whether it satisfies them. If the form fails its constraints, the browser fires a cancelable `invalid` event at the element, and then returns false.
     */
    checkValidity() {
      return this.$refs.__form.checkValidity()
    },
    /**
     * @private
     */
    invalid(e) {
      /**
       * Fired when a submittable element has been checked and doesn't satisfy its constraints. The validity of submittable elements is checked before submitting their owner form, or after the `checkValidity()` of the element or its owner form is called.
       */
      this.$emit('invalid', e)
    },
    /**
     * Reset the value of all elements of the parent form.
     */
    reset() {
      let { editDoc } = this
      for (const key in editDoc) {
        const ns = key.split('.')
        const n = ns.pop()
        const ret = ns.length > 0 ? initChild(this, editDoc, ns) : editDoc
        const value = getChild(this, this.defaultDoc, key.split('.'))
        this.$set(ret, n, value)
      }
    },
    /**
     * 返回表单中正在编辑的数据
     */
    editing(isCheckValidity = true) {
      if (isCheckValidity && !this.checkValidity()) return false
      return this.editDoc
    },
    /**
     * Send the content of the form to the server
     */
    submit(event) {
      if (this.checkValidity()) {
        /**
         * Fired when a form is submitted
         */
        this.$emit('submit', event)
      }
    },
    /**
     * Set a message error.
     */
    setErrorMessage(message) {
      this.error = message
    },
    /**
     * clear the message error.
     */
    clearErrorMessage() {
      this.error = null
		}
  }
}
</script>

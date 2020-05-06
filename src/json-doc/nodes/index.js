import { Node } from './node'
import { FieldNode } from './field-node'
import { Input } from './input'
import { Select } from './select'
import { Textarea } from './textarea'
import { Checkboxgroup } from './checkboxgroup'
import { ObjectNode } from './object'
import { LabelNode } from './label'
import { FormNode } from './form'
import { ObjectFile } from './file'

const option = { native: true }
/**
 * 支持的组件类型
 */
const components = {
  title: { tag: 'h1', option },
  description: { tag: 'p', option },
  error: { tag: 'div', option },
  form: { tag: 'form', option },
  label: { tag: 'label', option },
  input: { tag: 'input', option },
  textarea: { tag: 'textarea', option },
  radio: { tag: 'input', option },
  radiogroup: { tag: 'div', option },
  select: { tag: 'select', option },
  option: { tag: 'option', option },
  checkbox: { tag: 'input', option },
  checkboxgroup: { tag: 'div', option },
  file: { tag: 'input', option },
  button: {
    tag: 'button',
    option: {
      ...option,
      type: 'submit',
      label: 'Submit'
    }
  },
  jsondoc: { tag: 'tms-json-doc', option }
}

function prepareFieldNode(vm, createElement, field) {
  switch (field.type) {
    case 'textarea':
      return new Textarea(vm, createElement, field)
    case 'select':
      return new Select(vm, createElement, field)
    case 'checkboxgroup':
      return new Checkboxgroup(vm, createElement, field)
    case 'array':
    case 'object':
			return new ObjectNode(vm, createElement, field)
		case 'file':
			return new ObjectFile(vm, createElement, field)
    default:
      return new Input(vm, createElement, field)
  }
}

export {
  components,
  prepareFieldNode,
  Node,
  FieldNode,
  Input,
  Select,
  Textarea,
  Checkboxgroup,
  ObjectNode,
  LabelNode,
  FormNode
}

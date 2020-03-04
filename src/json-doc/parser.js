import { FieldBoolean, FieldText, FieldArray, FieldFreeArray } from './fields'

const { initChild, getChild } = require('./utils')

const ARRAY_KEYWORDS = ['anyOf', 'oneOf', 'enum']

function setCommonFields(schema, field, schemaName) {
  // eslint-disable-next-line no-nested-ternary
  field.value = schema.hasOwnProperty('default') ? schema.default : field.hasOwnProperty('value') ? field.value : ''
  field.component = schema.component
  field.schemaType = schema.type
  field.label = schema.title || ''
  field.description = schema.description || ''
  field.required = schema.required || false
  field.disabled = schema.disabled || false
  field.name = schemaName
  field.schema = schema
}
/**
 * 初始化form的数据对象
 *
 * @param {*} vm
 * @param {*} field
 */
function setFormValue(vm, field) {
  const { editDoc } = vm
  const ns = field.name.split('.')
  const vmValue = getChild(editDoc, ns)
  if (!vmValue) {
    const n = ns.pop()
    const ret = ns.length > 0 ? initChild(editDoc, ns) : editDoc
    vm.$set(ret, n, field.value)
  }
}
export function parseBoolean(vm, schema, schemaName) {
  const field = new FieldBoolean(schema.attrs)
  //if (schema.attrs) Object.assign(field, schema.attrs)

  setCommonFields(schema, field, schemaName)

  if (!field.type) {
    field.type = 'checkbox'
  }

  field.checked = schema.checked || false

  if (schema.name) {
    field.name = schemaName

    setFormValue(vm, field)
  }

  return field
}

export function parseText(vm, schema, schemaName) {
  const field = new FieldText(schema.attrs)
  //if (schema.attrs) Object.assign(field, schema.attrs)

  if (schema.format) {
    switch (schema.format) {
      case 'email':
        if (!field.type) {
          field.type = 'email'
        }
        break
      case 'uri':
        if (!field.type) {
          field.type = 'url'
        }
        break
      case 'regex':
        if (!field.type) {
          field.type = 'text'
        }

        field.pattern = schema.pattern
        break
    }
  }

  if (!field.type) {
    switch (schema.type) {
      case 'number':
      case 'integer':
        field.type = 'number'
        break
      default:
        field.type = 'text'
    }
  }

  setCommonFields(schema, field, schemaName)

  if (schema.name) {
    field.name = schemaName

    setFormValue(vm, field)
  }

  if (schema.minLength) {
    field.minlength = schema.minLength
  }

  if (schema.maxLength) {
    field.maxlength = schema.maxLength
  }

  return field
}

export function parseItems(items) {
  return items.map(item => {
    if (typeof item !== 'object') {
      return { value: item, label: item }
    }

    return item
  })
}

export function parseArray(vm, schema, schemaName) {
  const field = new FieldArray(schema.attrs)
  //if (schema.attrs) Object.assign(field, schema.attrs)

  setCommonFields(schema, field, schemaName)

  field.multiple = schema.minItems > 1

  field.items = []

  for (const keyword of ARRAY_KEYWORDS) {
    if (schema.hasOwnProperty(keyword)) {
      switch (keyword) {
        case 'enum':
          if (!field.type) {
            field.type = 'select'
          }
          field.itemType = 'option'
          field.value = field.hasOwnProperty('value') ? field.value : ''
          field.items = parseItems(schema[keyword])
          break

        case 'oneOf':
          field.type = 'radiogroup'
          field.itemType = 'radio'
          field.value = field.hasOwnProperty('value') ? field.value : ''
          field.items = parseItems(schema[keyword])
          break

        case 'anyOf':
          field.type = 'checkboxgroup'
          field.itemType = 'checkbox'
          field.value = Array.isArray(field.value) ? field.value : []
          field.items = parseItems(schema[keyword])
          break
      }
    }
  }
  if (!field.type) {
    field.type = schema.type
    field.value = field.hasOwnProperty('value') ? field.value : []
    field.items = []
  }

  if (schema.name) {
    field.name = schemaName

    setFormValue(vm, field)
  }

  return field
}
export function parseFreeArray(vm, schema, schemaName) {
  const field = new FieldFreeArray(schema.attrs)
  //if (schema.attrs) Object.assign(field, schema.attrs)

  setCommonFields(schema, field, schemaName)

  field.multiple = schema.minItems > 1
  field.type = schema.type
  field.itemSchema = schema.items
  field.value = []
  setFormValue(vm, field)

  return field
}
/**
 * 根据schema生成field
 *
 * @param {*} vm
 * @param {*} schema
 * @param {Object} fields 属性名和属性定义的对应。field是一个对象。
 * @param {Array<String>} sub field的路径
 */
export function loadFields(vm, schema, fields = vm.fields, sub) {
  if (!schema || schema.visible === false) return

  const schemaName = sub ? sub.join('.') : schema.name
  if (schema.type !== 'object' && !schemaName) return

  switch (schema.type) {
    case 'object':
      for (const key in schema.properties) {
        schema.properties[key].name = key

        if (schema.required) {
          for (const field of schema.required) {
            if (schema.properties[field]) {
              schema.properties[field].required = true
            }
          }
        }
        // 给对象创建一个field，对象下的filed都放在该field中，便于后续显示时，将对象作为一个整体处理
        if (schema.name && !fields[schemaName]) {
          fields[schemaName] = {
            $sub: true, // 指明这是嵌套定义
            $title: schema.title,
            $description: schema.description
          }
        }
        loadFields(
          vm,
          schema.properties[key],
          schema.name ? fields[schemaName] : undefined,
          sub ? [...sub, key] : [key]
        )
      }
      break

    case 'boolean':
      fields[schemaName] = parseBoolean(vm, schema, schemaName)
      break

    case 'array':
      fields[schemaName] = ARRAY_KEYWORDS.some(kw => schema.hasOwnProperty(kw))
        ? parseArray(vm, schema, schemaName)
        : parseFreeArray(vm, schema, schemaName)
      break

    case 'integer':
    case 'number':
    case 'string':
      for (const keyword of ARRAY_KEYWORDS) {
        if (schema.hasOwnProperty(keyword)) {
          schema.items = {
            type: schema.type,
            enum: schema[keyword]
          }
          fields[schemaName] = parseArray(vm, schema, schemaName)
          return
        }
      }
      fields[schemaName] = parseText(vm, schema, schemaName)
      break
    default:
      fields[schemaName] = parseText(vm, schema, schemaName)
  }
}

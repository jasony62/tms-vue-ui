import { initChild, getChild } from '../utils'
import { FieldNode } from './field-node'

export class Input extends FieldNode {
  /**
   * 更新field对应的model数据
   */
  updateModel(newValue) {
    const { field } = this
    const fieldName = field.name
    const ns = fieldName.split('.')
    const n = ns.pop()
    const formModel = ns.length > 0 ? initChild(this.vm, this.vm.editDoc, ns) : this.vm.editDoc
    //this.vm.$set(formModel, n, newValue)
    Object.keys(formModel).forEach((key) => {
      if (typeof formModel[key] === 'string') {
        formModel[key] = formModel[key].trim()
      }
    })
    if (typeof newValue === 'string') formModel[n] = newValue.trim()
    else formModel[n] = newValue
  }
  /**
   *
   *
   * @param {*} attrOrProps
   */
  options(attrOrProps) {
    const fieldName = this.field.name
    const fieldValue = getChild(this.vm, this.vm.editDoc, fieldName.split('.'))
    const inputOptions = {
      ref: fieldName,
      domProps: {
        value: fieldValue
      },
      on: {
        input: event => {
          const { schema, fields, editDoc, onAxios, setErrorMessage } = this.vm
          const newValue = event && event.target ? event.target.value : event
          this.updateModel(newValue)
          this.vm.$forceUpdate()
          this.vm.$emit('input', editDoc)
          if (this.field.assocs) {
            for (let i = 0; i < this.field.assocs.length; i++) {
              let oDep, oRule;
              oDep = this.field.assocs[i]
              oRule = schema.eventDependencies[oDep].rule
              editDoc[oDep] = ""
              let postData = {}
              oRule.params.forEach(param => {
                postData[param] = {
                  'feature': 'start',
                  'keyword': editDoc[param]
                }
              })
              onAxios().post(oRule.url, { 'filter': postData }).then(rst => {
                const data = rst.data.result.docs || rst.data.result
                if (oRule.type === 'v1') {
                  editDoc[oDep] = data[0][oDep] || data[oDep]
                } else if (oRule.type === 'v2') {
                  let arr = []
                  data.forEach(item => {
                    let value = item[oDep]
                    arr.push({ 'label': value, 'value': value })
                  })
                  fields[oDep].items = arr
                  if (data.length === 1) {
                    editDoc[oDep] = arr[0].value
                  }
                }
              }).catch(() => {
                setErrorMessage('数据解析错误')
              })
            }
          }
        }
      },
      ...attrOrProps
    }
    if (!inputOptions.hasOwnProperty('props')) inputOptions.props = {}
    inputOptions.props.value = fieldValue

    return inputOptions
  }
  children() {
    const children = []
    if (/radio|checkbox/.test(this.field.type)) this.createItems(children)
    return children
  }
  createItems(children) {
    const { createElement, field } = this
    if (field.hasOwnProperty('items')) {
      field.items.forEach(item => {
        const itemField = { type: field.itemType, name: field.name, ...item }
        const itemNode = new Input(this.vm, createElement, itemField)
        children.push(itemNode.createElem([item.label]))
      })
    }
  }
}

import { initChild } from './utils'
import { Input } from './input'

export class Checkboxgroup extends Input {
  /**
   * 更新field对应的model数据
   */
  updateModel(newValue) {
    const { field } = this
    const fieldName = field.name
    const ns = fieldName.split('.')
    const n = ns.pop()
    const formModel = ns.length > 0 ? initChild(this.vm.editDoc, ns) : this.vm.editDoc
    if (!Array.isArray(formModel[n])) formModel[n] = []
    if (field.schema.items && /integer|number/.test(field.schema.items.type)) {
      newValue = Number(newValue)
    }
    const index = formModel[n].indexOf(newValue)
    if (index !== -1) formModel[n].splice(index, 1)
    else formModel[n].push(newValue)
  }
}

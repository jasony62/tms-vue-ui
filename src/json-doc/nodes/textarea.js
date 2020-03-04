import { Input } from './input.js'

export class Textarea extends Input {
  /**
   *
   * @param {*} attrOrProps
   */
  options(attrOrProps) {
    const nodeOptions = super.options(attrOrProps)
    if (this.rawArgs.option.native) {
      const fieldValue = this.fieldValue()
      nodeOptions.domProps.innerHTML = fieldValue
    }
    return nodeOptions
  }
}

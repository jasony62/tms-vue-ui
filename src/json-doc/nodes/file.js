import { FieldNode } from './field-node'

export class FileNode extends FieldNode {
  options(attrOrProps) {
    const options = {
      ...attrOrProps,
    }

    return options
  }
  children() {
    const children = []
    const { createElement } = this

    children.push(createElement('button', '上传文件'))

    return children
  }
}

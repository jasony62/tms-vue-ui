import { FieldNode } from './field-node'
import { components } from './index'

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

    children.push(createElement(components.button.tag, {
			props: {
				type: 'primary',
				size: 'small'
			}
		},'上传文件'))

    return children
  }
}

export class Render {
  /**
   * 按层级创建节点
   *
   * @param {*} createElement
   * @param {*} tags
   * @param {*} options
   * @param {*} children
   */
  static layered(createElement, tags, options, children) {
    if (typeof tags === 'string') tags = tags.split('.')
    if (!Array.isArray(tags)) throw Error('[Render.wrapByTag] 参数(tags)类型错误，需要数组或字符串')
    if (!options) options = {}

    let tag, node
    tag = tags.pop()
    node = createElement(tag, options[tag], children)
    while (tags.length > 0) {
      tag = tags.pop()
      node = createElement(tag, options[tag], [node])
    }
    return node
  }
}

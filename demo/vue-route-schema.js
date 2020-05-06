const Schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'tms-portal路由定义',
  description: 'tms-portal路由定义',
  type: 'object',
  properties: {
    name: {
      title: '路由定义名称',
      type: 'string'
    },
    routes: {
      title: '路由表',
      type: 'array',
      items: {
        $id: '#route',
        title: '路由',
        type: 'object',
        properties: {
          path: { title: '路径', type: 'string' },
          name: { title: '名称', type: 'string' },
          meta: {
            type: 'object',
            title: '元数据',
            properties: { title: { type: 'string', title: '显示名' } }
          },
          onlineComponent: {
            $id: '#onlineComponent',
            type: 'object',
            title: '在线组件',
            properties: {
              lib: {
                type: 'object',
                title: '组件库',
                properties: {
                  url: { type: 'string', title: 'url' },
                  includeCss: {
                    type: 'boolean',
                    title: '包括CSS',
                    default: false
                  },
                  radioOptions: {
                    type: 'string',
                    title: '单选测试',
                    radioType: '2',
                    oneOf: ['选项1', '选项2']
                  },
                  events: {
                    type: 'object',
                    title: '事件',
                    properties: {
                      success: {
                        type: 'object',
                        title: '成功',
                        properties: {
                          route: { type: 'string', title: '跳转路由' },
                          mapResponse: {
                            type: 'array',
                            title: '响应结果映射',
                            items: {
                              type: 'object',
                              properties: {
                                key: { type: 'string', title: '属性名' },
                                value: { title: '属性值' }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              defaultProps: {
                type: 'array',
                title: '默认属性',
                items: {
                  type: 'object',
                  properties: {
                    key: { type: 'string', title: '属性名' },
                    value: { title: '属性值' }
                  }
                }
              },
              responseProps: {
                type: 'array',
                title: '响应属性',
                items: {
                  type: 'object',
                  properties: {
                    key: { type: 'string', title: '属性名' },
                    value: { title: '属性值' }
                  }
                }
              }
            }
          },
          onlineComponents: {
            type: 'object',
            title: '命名路由',
            items: {
              $ref: '#onlineComponent'
            }
          },
          layoutComponent: {
            type: 'object',
            title: '布局组件',
            properties: {
              name: { type: 'string', title: '名称' },
              defaultProps: {
                type: 'object',
                title: '默认属性',
                properties: {
                  views: {
                    type: 'array',
                    title: '视图定义',
                    items: {
                      type: 'object',
                      properties: { name: { type: 'string', title: '名称' } }
                    }
                  }
                }
              }
            }
          },
          children: {
            type: 'array',
            title: '子路由表',
            items: { $ref: '#route' }
          }
        }
      }
    }
  }
}
export default Schema

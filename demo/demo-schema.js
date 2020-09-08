const Schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'json-doc表单组件',
  description: 'json-doc表单组件',
  type: 'object',
  properties: {
    name: {
      title: '活动名称',
      type: 'string',
      default: '10',
      readonly: true
    },
    resource: {
      title: '特殊资源',
      type: 'string',
      enum: [
        {
          label: '线上品牌赞助',
          value: 'a',
        },
        {
          label: '线下场地赞助',
          value: 'b',
        },
      ],
    },
    methods: {
      title: '活动形式',
      type: 'string',
      enum: [
        {
          label: '线上',
          value: 'a',
          group: 'v1'
        },
        {
          label: '线下',
          value: 'b',
          group: 'v2'
        },
      ],
      enumGroups: [
        {
          id: 'v1',
          label: '分组1',
          assocEnum: {
            property: 'resource',
            value: 'a',
          },
        },
        {
          id: 'v2',
          label: '分组2',
          assocEnum: {
            property: 'resource',
            value: 'b',
          },
        }
      ]
    },
    type: {
      title: '活动性质',
      type: 'array',
      enum: [
        {
          label: '美食/餐厅线上活动',
          value: 'a',
          group: 'v1',
        },
        {
          label: '地推活动',
          value: 'b',
          group: 'v1',
        },
        {
          label: '线下主题活动',
          value: 'a',
          group: 'v2',
        },
        {
          label: '单纯品牌曝光',
          value: 'b',
          group: 'v2',
        },
      ],
      enumGroups: [
        {
          id: 'v1',
          label: '分组1',
          assocEnum: {
            property: 'resource',
            value: 'a',
          },
        },
        {
          id: 'v2',
          label: '分组2',
          assocEnum: {
            property: 'resource',
            value: 'b',
          },
        }
      ],
    },
    online: {
      title: '线上赞助费',
      type: 'string',
      default: '100'
    },
    offline: {
      title: '线下赞助费',
      type: 'string',
    },
    files: {
      type: 'array',
      title: '上传图片和文件',
      items: {
        type: 'object',
        properties: {
          name: {
            title: '名字',
            type: 'string',
          },
          url: {
            title: '地址',
            type: 'string',
          },
        },
        format: 'file',
        formatAttrs: {
          accept: 'image/png,image/jpeg',
          size: '20MB',
          limit: 2,
        },
      },
    },
    areaCode: {
      title: '区号',
      type: 'string',
      enum: [{
        label: '010',
        value: '010'
      }, {
        label: '029',
        value: '029'
      }]
    },
    provience: {
      title: '省份',
      type: 'string'
    },
    city: {
      title: '本地网',
      type: 'string',
      enum: []
    }
  },
  dependencies: {
    online: {
      rules: {
        resource: 'a',
        type: 'a'
      },
      operator: 'and',
    },
    offline: {
      rules: {
        resource: 'b'
      },
      operator: 'or',
    },
  },
  eventDependencies: {
    provience: {
      rule: {
        url: 'http://localhost:8080/order/api/admin/document/list?db=testSync&cl=areacode&page=1&size=100',
        params: ['areaCode'],
        type: 'v1'
      }
    },
    city: {
      rule: {
        url: 'http://localhost:8080/order/api/admin/document/list?db=testSync&cl=areacode&page=1&size=100',
        params: ['areaCode'],
        type: 'v2'
      }
    }
  }
}

export default Schema

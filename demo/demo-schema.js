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
    type: {
      title: '活动性质',
      type: 'array',
      minItems: 2,
      maxItems: 3,
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
          value: 'c',
        },
        {
          label: '单纯品牌曝光',
          value: 'd',
        },
      ],
      enumGroups: [
        {
          id: 'v1',
          label: '分组1',
          assocEnum: {
            property: 'resouce',
            value: '1',
          },
        },
      ],
    },
    online: {
      title: '线上赞助费',
      type: 'string',
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
  },
  dependencies: {
    online: {
      rules: {
        resource: 'a'
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
}

export default Schema

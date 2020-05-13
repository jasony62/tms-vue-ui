const Schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'json-doc表单组件',
  description: 'json-doc表单组件',
  type: 'object',
  properties: {
		name: {
			title: '活动名称',
			type: 'string'
		},
    file1: {
      title: '上传文件',
      type: 'array',
			format: 'file',
			items: {
				type: 'object',
				attrs: {
					accept: 'image/png, image/jpeg', 
					size: "20MB",
					limit: 2
				}
			}
		},
		resource: {
			title: '特殊资源',
			type: 'string',
			radioType: '2',
			oneOf: ['线上品牌赞助', '线下场地免费']
		},
  },
}

export default Schema

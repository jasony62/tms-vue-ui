const Schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'json-doc表单组件',
  description: 'json-doc表单组件',
  type: 'object',
  properties: {
    file1: {
      title: '上传文件',
      type: 'array',
      format: 'file',
    },
  },
}

export default Schema

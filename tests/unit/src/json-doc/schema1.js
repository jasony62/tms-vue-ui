export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: '#demo',
  type: 'object',
  title: 'JsonDoc',
  description: '演示vue-json-ui-editor using element-ui',
  properties: {
    name: {
      title: '名称',
      type: 'string'
    },
    address: {
      type: 'object',
      title: '地址',
      properties: {
        region: {
          type: 'object',
          properties: {
            country: { type: 'string', title: '国家' },
            city: { type: 'string', title: '城市' }
          }
        },
        detail: {
          type: 'string',
          title: '详细描述'
        }
      }
    }
  }
}

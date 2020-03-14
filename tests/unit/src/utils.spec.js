import { JsonSchema } from '@/src/utils'
import schema from '@/demo/vue-route-schema'

describe('utils', () => {
  it('Schema.slim', () => {
    const doc = {
      name: '',
      routes: [
        {
          path: '',
          name: '',
          meta: { title: '' },
          onlineComponent: {
            lib: { url: '', includeCss: false, events: { success: { route: '', mapResponse: [] } } },
            defaultProps: [],
            responseProps: []
          },
          onlineComponents: {
            onlineComponents74: {
              lib: { url: 'http://1', includeCss: false, events: { success: { route: '', mapResponse: [] } } },
              defaultProps: [],
              responseProps: []
            }
          },
          layoutComponent: { name: '', defaultProps: { views: [] } },
          children: []
        }
      ]
    }

    const slimed = JsonSchema.slim(schema, doc)
    console.log(JSON.stringify(slimed))
  })
})

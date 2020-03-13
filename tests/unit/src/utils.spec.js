import { JsonSchema } from '@/src/utils'
import schema from '@/demo/vue-route-schema'

describe('utils', () => {
  it('Schema.slim', () => {
    const doc = {
      name: '',
      routes: [
        {
          path: '/home',
          name: 'home',
          meta: { title: '主页' },
          onlineComponent: {
            lib: {
              url: 'http://192.168.1/online1',
              includeCss: false,
              events: { success: { route: '', mapResponse: [] } }
            },
            defaultProps: [],
            responseProps: []
          },
          onlineComponents: {
            a: {
              lib: {
                url: 'http://192.168.1/online2',
                includeCss: false
              }
            }
          },
          layoutComponent: { name: '', defaultProps: { views: [] } },
          children: [
            {
              path: '',
              name: '',
              meta: { title: '' },
              onlineComponent: {
                lib: {
                  url: 'http://192.168.1.1/online3',
                  includeCss: false,
                  events: { success: { route: '', mapResponse: [] } }
                },
                defaultProps: [],
                responseProps: []
              },
              onlineComponents: {},
              layoutComponent: { name: '', defaultProps: { views: [] } },
              children: []
            }
          ]
        }
      ]
    }

    const slimed = JsonSchema.slim(schema, doc)
    console.log(JSON.stringify(slimed))
  })
})

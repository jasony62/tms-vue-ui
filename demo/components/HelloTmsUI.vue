<template>
  <div class="hello">
    <h3>Card</h3>
    <tms-card id="myCard" thumb="/images/123.jpg" desc="tms-card-desc">
      <template slot="title">
        <b>tms-card-title</b>
      </template>
      <template slot="desc">
        <span>
          tms-card-desc tms-card-desc tms-card-desc tms-card-desc tms-card-desc tms-card-desc tms-card-desc
          tms-card-desc
        </span>
      </template>
      <template slot="bottom">
        <tms-flex :elasticItems="[0]">
          <span>left</span>
          <span>right</span>
        </tms-flex>
      </template>
    </tms-card>
    <h3>Text</h3>
    <div style="width:200px">
      <h4>原始文本</h4>
      <tms-text>这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本</tms-text>
      <h4>显示两行</h4>
      <tms-text :lines="2">这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本</tms-text>
      <h4>小屏幕（小于等于768）显示两行</h4>
      <tms-text :lines-sm="2">这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本，这是一段文本</tms-text>
    </div>
    <h3>Login</h3>
    <div id="myLogin">
      <button @click="showLoginDialog">函数方式调用登录框</button>
      <div>
        <p>页面引入组件方式调用登录框：</p>
        <tms-login :on-success="fnSuccessToken" :on-fail="fnFailToken"></tms-login>
      </div>
    </div>
    <h3>JSON Schema</h3>
    <div id="myJsonSchema">
      <tms-json-schema :schema="jsonSchema"></tms-json-schema>
    </div>
    <h3>JSON Doc</h3>
    <div id="myJsonDoc">
      <tms-el-json-doc :schema="schema" :doc="model" v-on:submit="jsonDocSubmit"></tms-el-json-doc>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Text, Flex, Card, Login, JsonSchema, ElJsonDoc } from '../../lib'
import '../../lib/text/style'
import '../../lib/flex/style'
import '../../lib/card/style'
import '../../lib/login/style'

import { getCaptcha, getToken, loginDataSchema } from './login'

Vue.use(Text)
  .use(Flex)
  .use(Card)
  .use(Login, {
    schema: loginDataSchema,
    fnGetCaptcha: getCaptcha,
    fnGetToken: getToken
  })

export default {
  name: 'HelloTmsUI',
  components: { TmsJsonSchema: JsonSchema, TmsElJsonDoc: ElJsonDoc },
  data() {
    return {
      jsonSchema: {
        $id: 'https://example.com/card.schema.json',
        $schema: 'http://json-schema.org/draft-07/schema#',
        description:
          'A representation of a person, company, organization, or place',
        type: 'object',
        required: ['familyName', 'givenName'],
        properties: {
          fn: {
            description: 'Formatted Name',
            type: 'string'
          },
          familyName: {
            type: 'string'
          },
          givenName: {
            type: 'string'
          },
          additionalName: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          honorificPrefix: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          honorificSuffix: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          nickname: {
            type: 'string'
          },
          url: {
            type: 'string'
          },
          email: {
            type: 'object',
            properties: {
              type: {
                type: 'string'
              },
              value: {
                type: 'string'
              }
            }
          },
          tel: {
            type: 'object',
            properties: {
              type: {
                type: 'string'
              },
              value: {
                type: 'string'
              }
            }
          },
          tz: {
            type: 'string'
          },
          photo: {
            type: 'string'
          },
          logo: {
            type: 'string'
          },
          sound: {
            type: 'string'
          },
          bday: {
            type: 'string'
          },
          title: {
            type: 'string'
          },
          role: {
            type: 'string'
          },
          org: {
            type: 'object',
            properties: {
              organizationName: {
                type: 'string'
              },
              organizationUnit: {
                type: 'string'
              }
            }
          }
        }
      },
      schema: require('./newsletter'),
      model: {
        name: 'tms-vue-ui',
        sub: {
          sEmail: 'tms-vue-ui@gmail.com'
        },
        lists2: [],
        lists3: []
      }
    }
  },
  methods: {
    showLoginDialog() {
      const login = new Login(loginDataSchema, getCaptcha, getToken)
      login.showAsDialog(this.user).then(this.fnSuccessToken)
    },
    fnSuccessToken(token) {
      console.log('已获得token:' + token)
    },
    fnFailToken(msg) {
      console.log(msg)
    },
    jsonDocSubmit(newModel) {
      alert(JSON.stringify(newModel))
    }
  }
}
</script>

<style lang="less">
#myCard {
  height: 100px;
  .tms-card__thumb img {
    height: 100px;
    width: 100px;
  }
  .tms-card__desc {
    color: #666;
  }
}
#myLogin {
  width: 350px;
  margin: 0 auto;
  padding: 10px;
  background-color: #f5f5f5;
}
</style>

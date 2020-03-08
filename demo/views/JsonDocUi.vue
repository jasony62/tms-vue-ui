<template>
  <div id="myJsonDoc">
    <tms-el-json-doc :schema="schema" :doc="model" v-on:submit="jsonDocSubmit"></tms-el-json-doc>
  </div>
</template>

<script>
import Vue from 'vue'
//import { ObjectInput, JsonDoc, ElJsonDoc } from '@/lib'
import { ObjectInput, JsonDoc, ElJsonDoc } from '../../src'

Vue.component('tms-object-input', ObjectInput)
JsonDoc.setComponent('array', 'tms-object-input')
JsonDoc.setComponent('object', 'tms-object-input')

Vue.component('tms-el-json-doc', ElJsonDoc)
export default {
  name: 'HelloTmsUI',
  data() {
    return {
      schema: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id: '#demo',
        type: 'object',
        title: 'JsonDoc',
        description: '演示vue-json-ui-editor using element-ui',
        properties: {
          message: { type: 'string', title: '字符串' },
          textarea: {
            type: 'string',
            title: '长文本',
            minLength: 8,
            maxLength: 80,
            attrs: {
              type: 'textarea',
              placeholder: '请输入'
            }
          },
          select: {
            type: 'string',
            title: '下拉选择',
            default: 'b',
            enum: [
              { value: 'a', label: '选项1' },
              { value: 'b', label: '选项2' },
              { value: 'c', label: '选项3' }
            ]
          },
          yeaorno: {
            type: 'boolean',
            title: '是否题',
            default: true,
            attrs: {
              type: 'switch'
            }
          },
          intnum: {
            type: 'integer',
            title: '整数'
          },
          single: {
            type: 'integer',
            title: '单选题',
            default: 0,
            oneOf: [
              {
                value: 0,
                label: '选项1'
              },
              {
                value: 1,
                label: '选项2'
              },
              {
                value: 2,
                label: '选项3'
              }
            ]
          },
          multiple: {
            type: 'array',
            title: '多选题',
            items: { type: 'integer' },
            anyOf: [
              {
                value: 0,
                label: '选项1'
              },
              {
                value: 1,
                label: '选项2'
              },
              {
                value: 2,
                label: '选项3'
              }
            ]
          },
          array: {
            type: 'array',
            title: '数组',
            items: {
              type: 'object',
              properties: {
                text: {
                  type: 'string',
                  default: ''
                }
              }
            }
          },
          objarr: {
            type: 'object',
            title: '对象',
            items: {
              type: 'object',
              properties: {
                text: {
                  type: 'string',
                  default: ''
                }
              }
            }
          },
          rate: {
            type: 'number',
            title: '打分',
            default: 2,
            attrs: {
              type: 'rate',
              'allow-half': true
            }
          },
          color: {
            type: 'string',
            title: '颜色',
            default: '#409EFF',
            attrs: {
              type: 'color'
            }
          },
          inheritance: {
            type: 'array',
            title: '引用定义',
            items: {
              $ref: '#demo'
            }
          }
        }
      },
      model: { message: '你好', textarea: '', array: [], inheritance: [] }
    }
  },
  methods: {
    jsonDocSubmit(newModel) {
      alert(JSON.stringify(newModel))
    }
  }
}
</script>

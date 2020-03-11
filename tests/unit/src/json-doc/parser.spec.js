import { Parser } from '@/src/json-doc/parser'
import schema from './schema1'

describe('解析JSONSchema', () => {
  it('运行', () => {
    const vm = { $set: jest.fn() }
    const editDoc = {}
    const fields = Parser.parse(vm, editDoc, schema)
    console.log('fields', fields)
  })
})

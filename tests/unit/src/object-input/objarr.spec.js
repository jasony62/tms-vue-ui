import { Objarr } from '@/src/object-input/objarr'
describe('给对象添加数组行为', () => {
  it('对象-assocOf', () => {
    let obj = { a: {} }
    let objarr = new Objarr(obj)
    expect(objarr.assocOf(obj.a)).toMatchObject({ key: 'a', val: {} })
  })
  it('对象-indexOf', () => {
    let obj = { a: {} }
    let objarr = new Objarr(obj)
    expect(objarr.indexOf(obj.a)).toBe(0)
  })
  it('对象-添加新属性', () => {
    let obj = { a: {} }
    let objarr = new Objarr(obj)
    objarr.b = {}
    expect(objarr.assocOf(obj.b)).toMatchObject({ key: 'b', val: {} })
  })
  it('对象-修改属性', () => {
    let obj = { a: {}, b: {}, c: {} }
    let objarr = new Objarr(obj)
    objarr.rename('b', 'b1')
    expect(JSON.stringify(obj)).toBe(JSON.stringify({ a: {}, b1: {}, c: {} }))
  })
  it('对象-delete属性', () => {
    let obj = { a: {}, b: {} }
    let objarr = new Objarr(obj)
    delete objarr['a']
    expect(JSON.stringify(obj)).toBe(JSON.stringify({ b: {} }))
  })
  it('对象-move属性1', () => {
    let [a, b, c, d] = [{}, {}, {}, {}]
    let obj = { a, b, c, d }
    let objarr = new Objarr(obj)
    objarr.move('b', -1)
    expect(JSON.stringify(obj)).toBe(JSON.stringify({ b: {}, a: {}, c: {}, d: {} }))
  })
  it('对象-move属性2', () => {
    let [a, b, c, d] = [{}, {}, {}, {}]
    let obj = { a, b, c, d }
    let objarr = new Objarr(obj)
    objarr.move('b', 1)
    expect(JSON.stringify(obj)).toBe(JSON.stringify({ a: {}, c: {}, b: {}, d: {} }))
  })
  it('对象-move属性3', () => {
    let [a, b, c, d] = [{}, {}, {}, {}]
    let obj = { a, b, c, d }
    let objarr = new Objarr(obj)
    objarr.move('a', 3)
    expect(JSON.stringify(obj)).toBe(JSON.stringify({ b: {}, c: {}, d: {}, a: {} }))
  })
  it('对象-length属性', () => {
    let [a, b, c, d] = [{}, {}, {}, {}]
    let obj = { a, b, c, d }
    let objarr = new Objarr(obj)
    expect(objarr.length).toBe(4)
  })
  it('对象-[int]', () => {
    let [a, b, c, d] = [{}, {}, {}, {}]
    let obj = { a, b, c, d }
    let objarr = new Objarr(obj)
    expect(objarr[1]).toBe(b)
  })
  it('对象-forEach', () => {
    let [a, b, c, d] = [{}, {}, {}, {}]
    let obj = { a, b, c, d }
    let objarr = new Objarr(obj)
    const callback = jest.fn()
    objarr.forEach(callback)
    expect(callback.mock.calls.length).toBe(4)
    expect(callback.mock.calls[0][0]).toBe(a)
    expect(callback.mock.calls[0][1]).toBe(0)
    expect(callback.mock.calls[1][0]).toBe(b)
    expect(callback.mock.calls[1][1]).toBe(1)
    expect(callback.mock.calls[2][0]).toBe(c)
    expect(callback.mock.calls[2][1]).toBe(2)
    expect(callback.mock.calls[3][0]).toBe(d)
    expect(callback.mock.calls[3][1]).toBe(3)
  })
  it('对象-move属性4', () => {
    let [a, b, c, d] = [{}, {}, {}, {}]
    let obj = { a, b, c, d }
    let objarr = new Objarr(obj)
    objarr.move(0, 3)
    expect(JSON.stringify(obj)).toBe(JSON.stringify({ b: {}, c: {}, d: {}, a: {} }))
  })
  it('数组-assocOf', () => {
    let a = {},
      b = {}
    let array = [a, b]
    let objarr = new Objarr(array)
    expect(objarr.assocOf(b)).toMatchObject({ key: 1, val: {} })
  })
  it('数组-indexOf', () => {
    let a = {},
      b = {}
    let array = [a, b]
    let objarr = new Objarr(array)
    expect(objarr.indexOf(b)).toBe(1)
  })
  it('数组-push', () => {
    let a = {},
      b = {},
      c = {}
    let array = [a, b]
    let objarr = new Objarr(array)
    objarr.push(c)
    expect(array.length).toBe(3)
    expect(array[2]).toBe(c)
    expect(objarr.assocOf(c)).toMatchObject({ key: 2, val: {} })
  })
  it('数组-splice', () => {
    let arr = ['a', 'b', 'c']
    let objarr = new Objarr(arr)
    objarr.splice(1, 1)
    expect(JSON.stringify(arr)).toBe(JSON.stringify(['a', 'c']))
  })
  it('数组-move元素1', () => {
    let [a, b, c, d] = ['a', 'b', 'c', 'd']
    let arr = [a, b, c, d]
    let objarr = new Objarr(arr)
    objarr.move(1, -1)
    expect(JSON.stringify(arr)).toBe(JSON.stringify([b, a, c, d]))
  })
  it('数组-forEach', () => {
    let [a, b, c, d] = [{}, {}, {}, {}]
    let arr = [a, b, c, d]
    let objarr = new Objarr(arr)
    const callback = jest.fn()
    objarr.forEach(callback)
    expect(callback.mock.calls.length).toBe(4)
    expect(callback.mock.calls[0][0]).toBe(a)
    expect(callback.mock.calls[0][1]).toBe(0)
    expect(callback.mock.calls[1][0]).toBe(b)
    expect(callback.mock.calls[1][1]).toBe(1)
    expect(callback.mock.calls[2][0]).toBe(c)
    expect(callback.mock.calls[2][1]).toBe(2)
    expect(callback.mock.calls[3][0]).toBe(d)
    expect(callback.mock.calls[3][1]).toBe(3)
  })
})

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function getExtendibleLeaf(vm, obj, n, initIt) {
  const v = obj[n]
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    return v
  }
  if (initIt && v === undefined) {
    vm.$set(obj, n, {})
    return obj[n]
  }
}

export function getChild(vm, data, ns) {
  if (ns.length === 1) {
    return data[ns[0]]
  }
  let obj = data[ns[0]]
  if (obj === undefined) return obj
  let i = 1
  const end = ns.length - 1
  for (; i < end; i++) {
    obj = getExtendibleLeaf(vm, obj, ns[i], false)
    if (obj === undefined) return obj
  }
  return obj[ns[i]]
}

export function initChild(vm, data, ns) {
  if (ns.length === 1) {
    const ret = getExtendibleLeaf(vm, data, ns[0], true)
    if (ret === undefined) {
      throw new TypeError('fail to init because namespace ' + ns[0] + ' = ' + data[ns[0]])
    }
    return ret
  }
  let parent = data
  let obj = data[ns[0]]
  if (obj === undefined) {
    vm.$set(data, ns[0], {})
    obj = data[ns[0]]
  }
  for (let i = 1; i < ns.length; i++) {
    const n = ns[i]
    const ret = getExtendibleLeaf(vm, obj, n, true)
    if (ret === undefined) {
      throw new TypeError('fail to init because namespace ' + ns.join('.') + ' = ' + obj + '(' + typeof obj + ')')
    }
    parent = obj
    obj = ret
    if (parent[n] === undefined) {
      throw new TypeError('fail to init because namespace ' + ns.slice(0, i).join('.') + ' = ' + parent)
    }
  }
  return obj
}

export function setVal(vm, data, n, v) {
  const ns = Array.isArray(n) ? n : n.split('.')
  // eslint-disable-next-line
  n = ns.pop()
  const ret = ns.length > 0 ? initChild(vm, data, ns) : data
  ret[n] = v
  return v
}

export function getObj(obj, childArr, defaultVal) {
  if (childArr.length) {
    try {
      return getItem(obj, childArr, 0)
    } catch (e) {
      if (defaultVal !== undefined) {
        return setItem(obj, childArr, defaultVal);
      } else {
        return 'undefined'
      }
    }
  }
}

export function getItem(obj, arr, index) {
  if (arr.length - 1 !== index) {
    const tempObj = obj[arr[index]];
    return getItem(tempObj, arr, index + 1);
  }
  return obj[arr[index]];
}

export function setItem(obj, arr, dv) {
  arr.reduce((cur, key, index) => {
    if (!cur[key]) {
      cur[key] = {};
    }
    if (index === arr.length - 1) {
      cur[key] = dv;
    }
    return cur[key];
  }, obj);
  return obj
}


"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepClone = deepClone;
exports.getExtendibleLeaf = getExtendibleLeaf;
exports.getChild = getChild;
exports.initChild = initChild;
exports.setVal = setVal;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getExtendibleLeaf(obj, n, initIt) {
  var v = obj[n];

  if (v && _typeof(v) === 'object' && !Array.isArray(v)) {
    return v;
  }

  if (initIt && v === undefined) {
    return obj[n] = {};
  }
}

function getChild(data, ns) {
  if (ns.length === 1) {
    return data[ns[0]];
  }

  var obj = data[ns[0]];
  if (obj === undefined) return obj;
  var i = 1;
  var end = ns.length - 1;

  for (; i < end; i++) {
    obj = getExtendibleLeaf(obj, ns[i], false);
    if (obj === undefined) return obj;
  }

  return obj[ns[i]];
}

function initChild(data, ns) {
  if (ns.length === 1) {
    var ret = getExtendibleLeaf(data, ns[0], true);

    if (ret === undefined) {
      throw new TypeError('fail to init because namespace ' + ns[0] + ' = ' + data[ns[0]]);
    }

    return ret;
  }

  var parent = data;
  var obj = data[ns[0]];
  if (obj === undefined) obj = data[ns[0]] = {};

  for (var i = 1; i < ns.length; i++) {
    var n = ns[i];

    var _ret = getExtendibleLeaf(obj, n, true);

    if (_ret === undefined) {
      throw new TypeError('fail to init because namespace ' + ns.join('.') + ' = ' + obj + '(' + _typeof(obj) + ')');
    }

    parent = obj;
    obj = _ret;

    if (parent[n] === undefined) {
      throw new TypeError('fail to init because namespace ' + ns.slice(0, i).join('.') + ' = ' + parent);
    }
  }

  return obj;
}

function setVal(data, n, v) {
  var ns = Array.isArray(n) ? n : n.split('.'); // eslint-disable-next-line

  n = ns.pop();
  var ret = ns.length > 0 ? initChild(data, ns) : data;
  ret[n] = v;
  return v;
}
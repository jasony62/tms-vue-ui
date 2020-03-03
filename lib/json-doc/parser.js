'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseBoolean = parseBoolean;
exports.parseString = parseString;
exports.parseItems = parseItems;
exports.parseArray = parseArray;
exports.parseFreeArray = parseFreeArray;
exports.loadFields = loadFields;
exports.Field = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _require = require('./utils'),
    initChild = _require.initChild,
    getChild = _require.getChild;

var ARRAY_KEYWORDS = ['anyOf', 'oneOf', 'enum'];

function setCommonFields(schema, field, schemaName) {
  // eslint-disable-next-line no-nested-ternary
  field.value = schema.hasOwnProperty('default') ? schema.default : field.hasOwnProperty('value') ? field.value : '';
  field.component = schema.component;
  field.schemaType = schema.type;
  field.label = schema.title || '';
  field.description = schema.description || '';
  field.required = schema.required || false;
  field.disabled = schema.disabled || false;
  field.name = schemaName;
  field.schema = schema;
}
/**
 * 初始化form的数据对象
 *
 * @param {*} vm
 * @param {*} field
 */


function setFormValue(vm, field) {
  var editDoc = vm.editDoc;
  var ns = field.name.split('.');
  var vmValue = getChild(editDoc, ns);

  if (!vmValue) {
    var n = ns.pop();
    var ret = ns.length > 0 ? initChild(editDoc, ns) : editDoc;
    vm.$set(ret, n, field.value);
  }
}

var Field = function Field() {
  (0, _classCallCheck2.default)(this, Field);
};

exports.Field = Field;

function parseBoolean(vm, schema, schemaName) {
  var field = new Field();
  if (schema.attrs) Object.assign(field, schema.attrs);
  setCommonFields(schema, field, schemaName);

  if (!field.type) {
    field.type = 'checkbox';
  }

  field.checked = schema.checked || false;

  if (schema.name) {
    field.name = schemaName;
    setFormValue(vm, field);
  }

  return field;
}

function parseString(vm, schema, schemaName) {
  var field = new Field();
  if (schema.attrs) Object.assign(field, schema.attrs);

  if (schema.format) {
    switch (schema.format) {
      case 'email':
        if (!field.type) {
          field.type = 'email';
        }

        break;

      case 'uri':
        if (!field.type) {
          field.type = 'url';
        }

        break;

      case 'regex':
        if (!field.type) {
          field.type = 'text';
        }

        field.pattern = schema.pattern;
        break;
    }
  }

  if (!field.type) {
    switch (schema.type) {
      case 'number':
      case 'integer':
        field.type = 'number';
        break;

      default:
        field.type = 'text';
    }
  }

  setCommonFields(schema, field, schemaName);

  if (schema.name) {
    field.name = schemaName;
    setFormValue(vm, field);
  }

  if (schema.minLength) {
    field.minlength = schema.minLength;
  }

  if (schema.maxLength) {
    field.maxlength = schema.maxLength;
  }

  return field;
}

function parseItems(items) {
  return items.map(function (item) {
    if ((0, _typeof2.default)(item) !== 'object') {
      return {
        value: item,
        label: item
      };
    }

    return item;
  });
}

function parseArray(vm, schema, schemaName) {
  var field = new Field();
  if (schema.attrs) Object.assign(field, schema.attrs);
  setCommonFields(schema, field, schemaName);
  field.multiple = schema.minItems > 1;
  field.items = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ARRAY_KEYWORDS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var keyword = _step.value;

      if (schema.hasOwnProperty(keyword)) {
        switch (keyword) {
          case 'enum':
            if (!field.type) {
              field.type = 'select';
            }

            field.itemType = 'option';
            field.value = field.hasOwnProperty('value') ? field.value : '';
            field.items = parseItems(schema[keyword]);
            break;

          case 'oneOf':
            field.type = 'radiogroup';
            field.itemType = 'radio';
            field.value = field.hasOwnProperty('value') ? field.value : '';
            field.items = parseItems(schema[keyword]);
            break;

          case 'anyOf':
            field.type = 'checkboxgroup';
            field.itemType = 'checkbox';
            field.value = Array.isArray(field.value) ? field.value : [];
            field.items = parseItems(schema[keyword]);
            break;
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (!field.type) {
    field.type = schema.type;
    field.value = field.hasOwnProperty('value') ? field.value : [];
    field.items = [];
  }

  if (schema.name) {
    field.name = schemaName;
    setFormValue(vm, field);
  }

  return field;
}

function parseFreeArray(vm, schema, schemaName) {
  if (schema.attrs) Object.assign(field, schema.attrs);
  var field = schema.attrs || {};
  setCommonFields(schema, field, schemaName);
  field.multiple = schema.minItems > 1;
  field.type = schema.type;
  field.itemSchema = schema.items;
  field.value = [];
  setFormValue(vm, field);
  return field;
}
/**
 * 根据schema生成field
 *
 * @param {*} vm
 * @param {*} schema
 * @param {Object} fields 属性名和属性定义的对应。field是一个对象。
 * @param {Array<String>} sub field的路径
 */


function loadFields(vm, schema) {
  var fields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : vm.fields;
  var sub = arguments.length > 3 ? arguments[3] : undefined;
  if (!schema || schema.visible === false) return;
  var schemaName = sub ? sub.join('.') : schema.name;
  if (schema.type !== 'object' && !schemaName) return;

  switch (schema.type) {
    case 'object':
      for (var key in schema.properties) {
        schema.properties[key].name = key;

        if (schema.required) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = schema.required[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var field = _step2.value;

              if (schema.properties[field]) {
                schema.properties[field].required = true;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        } // 给对象创建一个field，对象下的filed都放在该field中，便于后续显示时，将对象作为一个整体处理


        if (schema.name && !fields[schemaName]) {
          fields[schemaName] = {
            $sub: true,
            // 指明这是嵌套定义
            $title: schema.title,
            $description: schema.description
          };
        }

        loadFields(vm, schema.properties[key], schema.name ? fields[schemaName] : undefined, sub ? [].concat((0, _toConsumableArray2.default)(sub), [key]) : [key]);
      }

      break;

    case 'boolean':
      fields[schemaName] = parseBoolean(vm, schema, schemaName);
      break;

    case 'array':
      fields[schemaName] = ARRAY_KEYWORDS.some(function (kw) {
        return schema.hasOwnProperty(kw);
      }) ? parseArray(vm, schema, schemaName) : parseFreeArray(vm, schema, schemaName);
      break;

    case 'integer':
    case 'number':
    case 'string':
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = ARRAY_KEYWORDS[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var keyword = _step3.value;

          if (schema.hasOwnProperty(keyword)) {
            schema.items = {
              type: schema.type,
              enum: schema[keyword]
            };
            fields[schemaName] = parseArray(vm, schema, schemaName);
            return;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      fields[schemaName] = parseString(vm, schema, schemaName);
      break;

    default:
      fields[schemaName] = parseString(vm, schema, schemaName);
  }
}
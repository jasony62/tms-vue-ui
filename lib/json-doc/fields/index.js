"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createField = createField;
Object.defineProperty(exports, "Field", {
  enumerable: true,
  get: function get() {
    return _field.Field;
  }
});
Object.defineProperty(exports, "ARRAY_KEYWORDS", {
  enumerable: true,
  get: function get() {
    return _field.ARRAY_KEYWORDS;
  }
});
Object.defineProperty(exports, "FieldBoolean", {
  enumerable: true,
  get: function get() {
    return _boolean.FieldBoolean;
  }
});
Object.defineProperty(exports, "FieldText", {
  enumerable: true,
  get: function get() {
    return _text.FieldText;
  }
});
Object.defineProperty(exports, "FieldArray", {
  enumerable: true,
  get: function get() {
    return _array.FieldArray;
  }
});
Object.defineProperty(exports, "FieldFreeArray", {
  enumerable: true,
  get: function get() {
    return _freeArray.FieldFreeArray;
  }
});

var _field = require("./field");

var _boolean = require("./boolean");

var _text = require("./text");

var _array = require("./array");

var _freeArray = require("./free-array");

function createField(schema, schemaName, refs) {
  var newField;

  switch (schema.type) {
    case 'boolean':
      newField = new _boolean.FieldBoolean(schema, schemaName);
      break;

    case 'array':
      newField = _field.ARRAY_KEYWORDS.some(function (kw) {
        return schema.hasOwnProperty(kw);
      }) ? new _array.FieldArray(schema, schemaName) : new _freeArray.FieldFreeArray(schema, schemaName, refs);
      break;

    case 'integer':
    case 'number':
    case 'string':
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _field.ARRAY_KEYWORDS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var keyword = _step.value;

          if (schema.hasOwnProperty(keyword)) {
            schema.items = {
              type: schema.type,
              enum: schema[keyword]
            };
            newField = new _array.FieldArray(schema, schemaName);
            break;
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

      if (!newField) newField = new _text.FieldText(schema, schemaName);
      break;

    default:
      newField = new _text.FieldText(schema, schemaName);
  }

  return newField;
}
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _fields = require("./fields");

var _utils = require("./utils");

var Parser = /*#__PURE__*/function () {
  function Parser(vm, schema) {
    (0, _classCallCheck2.default)(this, Parser);
    this.vm = vm;
    this.rootSchema = schema;
    this.schemaRefs = {};
  }
  /**
   * 根据schema的定义初始化表单的model对象
   *
   * @param {Field} field
   */


  (0, _createClass2.default)(Parser, [{
    key: "setModelValue",
    value: function setModelValue(field) {
      var editDoc = this.vm.editDoc;
      var ns = field.name.split('.');
      var vmValue = (0, _utils.getChild)(editDoc, ns);

      if (!vmValue) {
        var n = ns.pop();
        var ret = ns.length > 0 ? (0, _utils.initChild)(editDoc, ns) : editDoc;
        this.vm.$set(ret, n, field.value);
      }
    }
  }, {
    key: "parse",
    value: function parse() {
      var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.rootSchema;
      var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.vm.fields;
      var sub = arguments.length > 2 ? arguments[2] : undefined;
      if (!schema || schema.visible === false) return;
      var schemaName = sub ? sub.join('.') : schema.name;
      if (schema.type !== 'object' && !schemaName) return;
      if (schema.$id) this.schemaRefs[schema.$id] = schema;

      if (schema.type === 'object') {
        for (var key in schema.properties) {
          schema.properties[key].name = key;

          if (schema.required) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = schema.required[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var field = _step.value;

                if (schema.properties[field]) {
                  schema.properties[field].required = true;
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
          } // 给对象创建一个field，对象下的filed都放在该field中，便于后续显示时，将对象作为一个整体处理


          if (schema.name && !fields[schemaName]) {
            fields[schemaName] = {
              $sub: true,
              // 指明这是嵌套定义
              $title: schema.title,
              $description: schema.description
            };
          }

          this.parse(schema.properties[key], schema.name ? fields[schemaName] : undefined, sub ? [].concat((0, _toConsumableArray2.default)(sub), [key]) : [key]);
        }

        return;
      }

      var newField = (0, _fields.createField)(schema, schemaName, this.schemaRefs);
      this.setModelValue(newField);
      fields[schemaName] = newField;
    }
  }], [{
    key: "parse",
    value: function parse(vm, schema) {
      var parser = new Parser(vm, schema);
      parser.parse();
    }
  }]);
  return Parser;
}();

exports.Parser = Parser;
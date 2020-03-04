"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _utils = require("../utils");

var _fieldNode = require("./field-node");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Input = /*#__PURE__*/function (_FieldNode) {
  (0, _inherits2.default)(Input, _FieldNode);

  function Input() {
    (0, _classCallCheck2.default)(this, Input);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Input).apply(this, arguments));
  }

  (0, _createClass2.default)(Input, [{
    key: "updateModel",

    /**
     * 更新field对应的model数据
     */
    value: function updateModel(newValue) {
      var field = this.field;
      var fieldName = field.name;
      var ns = fieldName.split('.');
      var n = ns.pop();
      var formModel = ns.length > 0 ? (0, _utils.initChild)(this.vm.editDoc, ns) : this.vm.editDoc;
      this.vm.$set(formModel, n, newValue);
    }
    /**
     *
     *
     * @param {*} attrOrProps
     */

  }, {
    key: "options",
    value: function options(attrOrProps) {
      var _this = this;

      var fieldName = this.field.name;
      var fieldValue = (0, _utils.getChild)(this.vm.editDoc, fieldName.split('.'));

      var inputOptions = _objectSpread({
        ref: fieldName,
        domProps: {
          value: fieldValue
        },
        on: {
          input: function input(event) {
            var newValue = event && event.target ? event.target.value : event;

            _this.updateModel(newValue);

            _this.vm.$emit('input', _this.vm.editDoc);
          }
        }
      }, attrOrProps);

      if (!inputOptions.hasOwnProperty('props')) inputOptions.props = {};
      inputOptions.props.value = fieldValue;
      return inputOptions;
    }
  }, {
    key: "children",
    value: function children() {
      var children = [];
      if (/radio|checkbox/.test(this.field.type)) this.createItems(children);
      return children;
    }
  }, {
    key: "createItems",
    value: function createItems(children) {
      var _this2 = this;

      var createElement = this.createElement,
          field = this.field;

      if (field.hasOwnProperty('items')) {
        field.items.forEach(function (item) {
          var itemField = _objectSpread({
            type: field.itemType,
            name: field.name
          }, item);

          var itemNode = new Input(_this2.vm, createElement, itemField);
          children.push(itemNode.createElem([item.label]));
        });
      }
    }
  }]);
  return Input;
}(_fieldNode.FieldNode);

exports.Input = Input;
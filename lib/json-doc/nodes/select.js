"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _input = require("./input");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Select = /*#__PURE__*/function (_Input) {
  (0, _inherits2.default)(Select, _Input);

  function Select() {
    (0, _classCallCheck2.default)(this, Select);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Select).apply(this, arguments));
  }

  (0, _createClass2.default)(Select, [{
    key: "children",

    /**
     *
     */
    value: function children() {
      var _this = this;

      var children = [];
      var createElement = this.createElement,
          field = this.field;

      if (!field.required) {
        var optionField = _objectSpread({
          type: field.itemType,
          name: field.name
        }, {
          value: '',
          label: ''
        });

        var itemNode = new _input.Input(this.vm, createElement, optionField);

        itemNode.options = function (attrOrProps) {
          return attrOrProps;
        };

        children.push(itemNode.createElem());
      }

      field.items.forEach(function (option) {
        var optionField = _objectSpread({
          type: field.itemType,
          name: field.name
        }, option);

        var optionNode = new _input.Input(_this.vm, createElement, optionField);

        optionNode.options = function (attrOrProps) {
          return attrOrProps;
        };

        children.push(optionNode.createElem([option.label]));
      });
      return children;
    }
  }]);
  return Select;
}(_input.Input);

exports.Select = Select;
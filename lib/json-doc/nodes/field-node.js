"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldNode = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _utils = require("../utils");

var _index = require("./index");

var option = {
  native: true
};
var defaultInput = {
  tag: 'input',
  option: option
};
var defaultGroup = {
  tag: 'div',
  option: option
};
/**
 * 获得创建节点的原始参数
 *
 * @param {Object} field
 */

function getRawCreateArgs(field) {
  // 如果schema中指定了组件类型，直接使用
  var customComponent = field.component ? {
    tag: field.component,
    option: {}
  } : undefined; // field对应的组件类型，指定or预制，有items的变成group组件

  var args = field.component ? customComponent : field.hasOwnProperty('items') && field.type !== 'select' ? _index.components["".concat(field.type, "group")] || defaultGroup : _index.components[field.type] || defaultInput;
  return args;
}
/**
 * 表单中的模型属性节点包含value
 */


var FieldNode = /*#__PURE__*/function (_Node) {
  (0, _inherits2.default)(FieldNode, _Node);

  function FieldNode(vm, createElement, field) {
    var _this;

    (0, _classCallCheck2.default)(this, FieldNode);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FieldNode).call(this, vm, createElement, getRawCreateArgs(field)));
    _this.field = field;
    return _this;
  }
  /**
   * 初始值
   */


  (0, _createClass2.default)(FieldNode, [{
    key: "fieldValue",
    value: function fieldValue() {
      var field = this.field;
      var fieldName = field.name;
      var fieldValue = (0, _utils.getChild)(this.vm.editDoc, fieldName.split('.'));

      if (!field.value) {
        field.value = fieldValue;
      }

      return fieldValue;
    }
  }, {
    key: "children",
    value: function children() {
      return [];
    }
  }, {
    key: "createElem",
    value: function createElem(children) {
      var field = this.field,
          createElement = this.createElement;
      var attrOrProps = this.attrOrProps(field, field);
      var nodeOptions = this.options(attrOrProps);
      if (!Array.isArray(children)) children = this.children();
      var inputElement = createElement(this.rawArgs.tag, nodeOptions, children);
      return inputElement;
    }
  }]);
  return FieldNode;
}(_index.Node);

exports.FieldNode = FieldNode;
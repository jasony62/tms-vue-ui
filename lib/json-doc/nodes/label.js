"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelNode = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _index = require("./index");

/**
 *
 */
var LabelNode = /*#__PURE__*/function (_Node) {
  (0, _inherits2.default)(LabelNode, _Node);

  function LabelNode(vm, createElement, field) {
    var _this;

    (0, _classCallCheck2.default)(this, LabelNode);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LabelNode).call(this, vm, createElement, _index.components.label));
    _this.field = field;
    return _this;
  }

  (0, _createClass2.default)(LabelNode, [{
    key: "createElem",
    value: function createElem() {
      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var createElement = this.createElement,
          field = this.field;
      var attrOrProps = this.attrOrProps(field, field);
      var element = createElement(this.rawArgs.tag, attrOrProps, children);
      return element;
    }
  }]);
  return LabelNode;
}(_index.Node);

exports.LabelNode = LabelNode;
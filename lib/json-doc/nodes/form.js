"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormNode = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _index = require("./index");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 *
 */
var FormNode =
/*#__PURE__*/
function (_Node) {
  (0, _inherits2.default)(FormNode, _Node);

  function FormNode(vm, createElement) {
    (0, _classCallCheck2.default)(this, FormNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FormNode).call(this, vm, createElement, _index.components.form));
  }

  (0, _createClass2.default)(FormNode, [{
    key: "createElem",
    value: function createElem() {
      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var vm = this.vm;
      var createElement = this.createElement;
      var attrOrProps = this.attrOrProps({
        autocomplete: vm.autocomplete,
        novalidate: vm.novalidate
      });

      var nodeOptions = _objectSpread({
        ref: '__form',
        on: {
          submit: function submit(event) {
            event.stopPropagation();
            vm.submit(event);
          },
          invalid: vm.invalid
        }
      }, attrOrProps);

      var element = createElement(this.rawArgs.tag, nodeOptions, children);
      return element;
    }
  }]);
  return FormNode;
}(_index.Node);

exports.FormNode = FormNode;
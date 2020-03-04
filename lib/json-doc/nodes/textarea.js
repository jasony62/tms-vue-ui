"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Textarea = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _input = require("./input.js");

var Textarea = /*#__PURE__*/function (_Input) {
  (0, _inherits2.default)(Textarea, _Input);

  function Textarea() {
    (0, _classCallCheck2.default)(this, Textarea);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Textarea).apply(this, arguments));
  }

  (0, _createClass2.default)(Textarea, [{
    key: "options",

    /**
     *
     * @param {*} attrOrProps
     */
    value: function options(attrOrProps) {
      var nodeOptions = (0, _get2.default)((0, _getPrototypeOf2.default)(Textarea.prototype), "options", this).call(this, attrOrProps);

      if (this.rawArgs.option.native) {
        var fieldValue = this.fieldValue();
        nodeOptions.domProps.innerHTML = fieldValue;
      }

      return nodeOptions;
    }
  }]);
  return Textarea;
}(_input.Input);

exports.Textarea = Textarea;
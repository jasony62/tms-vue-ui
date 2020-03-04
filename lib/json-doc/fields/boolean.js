"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldBoolean = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _field = require("./field");

var FieldBoolean = /*#__PURE__*/function (_Field) {
  (0, _inherits2.default)(FieldBoolean, _Field);

  function FieldBoolean() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FieldBoolean);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FieldBoolean)).call.apply(_getPrototypeOf2, [this].concat(args)));

    if (!_this.type) {
      _this.type = 'checkbox';
    }

    _this.checked = _this.checked || false;
    return _this;
  }

  return FieldBoolean;
}(_field.Field);

exports.FieldBoolean = FieldBoolean;
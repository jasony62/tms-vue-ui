"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldText = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _field = require("./field");

/**
 * number,integer,string
 */
var FieldText =
/*#__PURE__*/
function (_Field) {
  (0, _inherits2.default)(FieldText, _Field);

  function FieldText() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FieldText);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FieldText)).call.apply(_getPrototypeOf2, [this].concat(args)));

    if (!_this.type && _this.schema.format) {
      switch (_this.schema.format) {
        case 'email':
          _this.type = 'email';
          break;

        case 'uri':
          _this.type = 'url';
          break;

        case 'regex':
          _this.type = 'text';
          _this.pattern = _this.schema.pattern;
          break;
      }
    }

    if (!_this.type) {
      switch (_this.schema.type) {
        case 'number':
        case 'integer':
          _this.type = 'number';
          break;

        default:
          _this.type = 'text';
      }
    }

    if (_this.schema.minLength) {
      _this.minlength = _this.schema.minLength;
    }

    if (_this.schema.maxLength) {
      _this.maxlength = _this.schema.maxLength;
    }

    return _this;
  }

  return FieldText;
}(_field.Field);

exports.FieldText = FieldText;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldFreeArray = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _field = require("./field");

var FieldFreeArray =
/*#__PURE__*/
function (_Field) {
  (0, _inherits2.default)(FieldFreeArray, _Field);

  function FieldFreeArray(schema, schemaName, refs) {
    var _this;

    (0, _classCallCheck2.default)(this, FieldFreeArray);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FieldFreeArray).call(this, schema, schemaName));
    _this.multiple = schema.minItems > 1;
    _this.type = schema.type;

    if (schema.items.$ref) {
      if (refs[schema.items.$ref]) {
        _this.itemSchema = refs[schema.items.$ref];
      }
    } else {
      _this.itemSchema = schema.items;
    }

    _this.value = Array.isArray(_this.value) ? _this.value : [];
    return _this;
  }

  return FieldFreeArray;
}(_field.Field);

exports.FieldFreeArray = FieldFreeArray;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = exports.ARRAY_KEYWORDS = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var ARRAY_KEYWORDS = ['anyOf', 'oneOf', 'enum'];
/**
 *
 */

exports.ARRAY_KEYWORDS = ARRAY_KEYWORDS;

var Field = function Field(schema, schemaName) {
  (0, _classCallCheck2.default)(this, Field);
  if ((0, _typeof2.default)(schema.attrs) === 'object') Object.assign(this, schema.attrs); // schema.default 或者 attrs.value 或者 ''

  this.value = schema.hasOwnProperty('default') ? schema.default : this.hasOwnProperty('value') ? this.value : '';
  this.component = schema.component;
  this.schemaType = schema.type;
  this.label = schema.title || '';
  this.description = schema.description || '';
  this.required = schema.required || false;
  this.disabled = schema.disabled || false;
  this.name = schema.name ? schema.name : schemaName;
  this.schema = schema;
};

exports.Field = Field;
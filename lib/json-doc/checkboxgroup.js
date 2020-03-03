"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkboxgroup = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _utils = require("./utils");

var _input = require("./input");

var Checkboxgroup =
/*#__PURE__*/
function (_Input) {
  (0, _inherits2.default)(Checkboxgroup, _Input);

  function Checkboxgroup() {
    (0, _classCallCheck2.default)(this, Checkboxgroup);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Checkboxgroup).apply(this, arguments));
  }

  (0, _createClass2.default)(Checkboxgroup, [{
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
      if (!Array.isArray(formModel[n])) formModel[n] = [];

      if (field.schema.items && /integer|number/.test(field.schema.items.type)) {
        newValue = Number(newValue);
      }

      var index = formModel[n].indexOf(newValue);
      if (index !== -1) formModel[n].splice(index, 1);else formModel[n].push(newValue);
    }
  }]);
  return Checkboxgroup;
}(_input.Input);

exports.Checkboxgroup = Checkboxgroup;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayNode = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _utils = require("../utils");

var _index = require("./index");

var _fieldNode = require("./field-node");

var ArrayNode = /*#__PURE__*/function (_FieldNode) {
  (0, _inherits2.default)(ArrayNode, _FieldNode);

  function ArrayNode() {
    (0, _classCallCheck2.default)(this, ArrayNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ArrayNode).apply(this, arguments));
  }

  (0, _createClass2.default)(ArrayNode, [{
    key: "options",
    value: function options() {
      var fieldValue = this.fieldValue();
      var createElement = this.createElement,
          field = this.field;
      var options = {
        props: {
          lines: fieldValue
        }
      };
      options.scopedSlots = {
        default: function _default(props) {
          var index = fieldValue.indexOf(props.line);
          var itemSchema = (0, _utils.deepClone)(field.itemSchema);
          itemSchema.name = "[".concat(index, "]");
          console.log('iiii', itemSchema);
          return createElement(_index.components.jsondoc.tag, {
            props: {
              schema: itemSchema,
              doc: props.line,
              requireButtons: false,
              oneWay: false
            }
          });
        }
      };
      options.on = {
        add: function add() {
          fieldValue.push({});
        }
      };
      return options;
    }
  }]);
  return ArrayNode;
}(_fieldNode.FieldNode);

exports.ArrayNode = ArrayNode;
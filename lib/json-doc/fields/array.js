"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseItems = parseItems;
exports.FieldArray = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _field = require("./field");

function parseItems(items) {
  return items.map(function (item) {
    if ((0, _typeof2.default)(item) !== 'object') {
      return {
        value: item,
        label: item
      };
    }

    return item;
  });
}

var FieldArray = /*#__PURE__*/function (_Field) {
  (0, _inherits2.default)(FieldArray, _Field);

  function FieldArray() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FieldArray);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FieldArray)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.multiple = _this.schema.minItems > 1;
    _this.items = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _field.ARRAY_KEYWORDS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var keyword = _step.value;

        if (_this.schema.hasOwnProperty(keyword)) {
          switch (keyword) {
            case 'enum':
              if (!_this.type) {
                _this.type = 'select';
              }

              _this.itemType = 'option';
              _this.items = parseItems(_this.schema[keyword]);
              break;

            case 'oneOf':
              _this.type = 'radiogroup';
              _this.itemType = 'radio';
              _this.value = _this.hasOwnProperty('value') ? _this.value : '';
              _this.items = parseItems(_this.schema[keyword]);
              break;

            case 'anyOf':
              _this.type = 'checkboxgroup';
              _this.itemType = 'checkbox';
              _this.value = Array.isArray(_this.value) ? _this.value : [];
              _this.items = parseItems(_this.schema[keyword]);
              break;
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!_this.type) {
      _this.type = _this.schema.type;
      _this.items = [];
    }

    return _this;
  }

  return FieldArray;
}(_field.Field);

exports.FieldArray = FieldArray;
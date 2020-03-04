"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareFieldNode = prepareFieldNode;
Object.defineProperty(exports, "Node", {
  enumerable: true,
  get: function get() {
    return _node.Node;
  }
});
Object.defineProperty(exports, "FieldNode", {
  enumerable: true,
  get: function get() {
    return _fieldNode.FieldNode;
  }
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function get() {
    return _input.Input;
  }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function get() {
    return _select.Select;
  }
});
Object.defineProperty(exports, "Textarea", {
  enumerable: true,
  get: function get() {
    return _textarea.Textarea;
  }
});
Object.defineProperty(exports, "Checkboxgroup", {
  enumerable: true,
  get: function get() {
    return _checkboxgroup.Checkboxgroup;
  }
});
Object.defineProperty(exports, "ArrayNode", {
  enumerable: true,
  get: function get() {
    return _array.ArrayNode;
  }
});
Object.defineProperty(exports, "LabelNode", {
  enumerable: true,
  get: function get() {
    return _label.LabelNode;
  }
});
Object.defineProperty(exports, "FormNode", {
  enumerable: true,
  get: function get() {
    return _form.FormNode;
  }
});
exports.components = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _node = require("./node");

var _fieldNode = require("./field-node");

var _input = require("./input");

var _select = require("./select");

var _textarea = require("./textarea");

var _checkboxgroup = require("./checkboxgroup");

var _array = require("./array");

var _label = require("./label");

var _form = require("./form");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var option = {
  native: true
};
/**
 * 支持的组件类型
 */

var components = {
  title: {
    tag: 'h1',
    option: option
  },
  description: {
    tag: 'p',
    option: option
  },
  error: {
    tag: 'div',
    option: option
  },
  form: {
    tag: 'form',
    option: option
  },
  label: {
    tag: 'label',
    option: option
  },
  input: {
    tag: 'input',
    option: option
  },
  textarea: {
    tag: 'textarea',
    option: option
  },
  radio: {
    tag: 'input',
    option: option
  },
  radiogroup: {
    tag: 'div',
    option: option
  },
  select: {
    tag: 'select',
    option: option
  },
  option: {
    tag: 'option',
    option: option
  },
  checkbox: {
    tag: 'input',
    option: option
  },
  checkboxgroup: {
    tag: 'div',
    option: option
  },
  file: {
    tag: 'input',
    option: option
  },
  button: {
    tag: 'button',
    option: _objectSpread({}, option, {
      type: 'submit',
      label: 'Submit'
    })
  },
  jsondoc: {
    tag: 'tms-json-doc',
    option: option
  }
};
exports.components = components;

function prepareFieldNode(vm, createElement, field) {
  switch (field.type) {
    case 'textarea':
      return new _textarea.Textarea(vm, createElement, field);

    case 'select':
      return new _select.Select(vm, createElement, field);

    case 'checkboxgroup':
      return new _checkboxgroup.Checkboxgroup(vm, createElement, field);

    case 'array':
      return new _array.ArrayNode(vm, createElement, field);

    default:
      return new _input.Input(vm, createElement, field);
  }
}
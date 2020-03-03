"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = require("./utils");

var _node = require("./node");

var _input = require("./input");

var _textarea = require("./textarea");

var _select = require("./select");

var _checkboxgroup = require("./checkboxgroup");

var _array = require("./array");

var _form = require("./form");

var _label = require("./label");

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
/**
 * 创建编辑器
 */


var Creator =
/*#__PURE__*/
function () {
  function Creator(vm, createElement) {
    (0, _classCallCheck2.default)(this, Creator);
    this.vm = vm;
    this.createElement = createElement;
  }

  (0, _createClass2.default)(Creator, [{
    key: "createLabelAndDesc",
    value: function createLabelAndDesc(field, inputElement) {
      var vm = this.vm,
          createElement = this.createElement;
      var formControlsNodes = [];

      if (field.label) {
        var labelNode = new _label.LabelNode(vm, createElement, field);
        var labelNodes = [];

        if (_node.components.label.option.native) {
          labelNodes.push(createElement('span', {
            attrs: {
              'data-required-field': field.required ? 'true' : 'false'
            }
          }, field.label));
        }

        labelNodes.push(inputElement);

        if (field.description) {
          labelNodes.push(createElement('br'));
          labelNodes.push(createElement('small', field.description));
        }

        formControlsNodes.push(labelNode.createElem(labelNodes));
      } else {
        formControlsNodes.push(inputElement);

        if (field.description) {
          formControlsNodes.push(createElement('br'));
          formControlsNodes.push(createElement('small', field.description));
        }
      }

      return formControlsNodes;
    }
  }, {
    key: "createWrappingClass",
    value: function createWrappingClass(formNodes, formControlsNodes) {
      var createElement = this.createElement;

      if (this.inputWrappingClass) {
        formNodes.push(createElement('div', {
          class: this.inputWrappingClass
        }, formControlsNodes));
      } else {
        formControlsNodes.forEach(function (node) {
          return formNodes.push(node);
        });
      }
    }
  }, {
    key: "createNodeByField",
    value: function createNodeByField(fields, key) {
      var vm = this.vm,
          createElement = this.createElement;
      var field = fields[key];
      var formNodes = []; // 当前form中的节点

      var node = prepareFieldNode(vm, createElement, field);
      var inputNode = node.createElem();
      var formControlsNodes = this.createLabelAndDesc(field, inputNode);
      this.createWrappingClass(formNodes, formControlsNodes);
      return formNodes[0];
    }
    /**
     * 按表单创建组件
     *
     * 执行的结果保留在formNode中，根表单放在root中，其他子表单放在自表单名命名（name）的对象中
     */

  }, {
    key: "createNodesByForm",
    value: function createNodesByForm(formNode, fields, sub) {
      var _this = this;

      if (Object.keys(fields).length === 0) return; // 引用formNode中的表单（root或嵌套表单），记录当前表单包含的节点

      var singleFormNodes = sub ? (0, _utils.setVal)(formNode, sub.pop(), {}) : formNode.root;
      Object.keys(fields).forEach(function (key) {
        if (key.indexOf('$') === 0) return;
        var field = fields[key]; // 创建嵌套form中的节点

        if (field.$sub) {
          return _this.createNodesByForm(formNode, field, sub ? [].concat((0, _toConsumableArray2.default)(sub), [key]) : [key]);
        } // 创建节点


        singleFormNodes[key] = _this.createNodeByField(fields, key, sub, formNode);
      });
    }
    /**
     * 将所有表单放入1个组件列表中
     *
     * 如果指定了表单标题，创建<div class="sub-title"></div>
     * 如果存在子表单，将它用<div class="sub"></div>包裹起来
     *
     */

  }, {
    key: "arrangeAllNode",
    value: function arrangeAllNode(formNode, fields, sub) {
      var _this2 = this;

      var createElement = this.createElement;
      var nodes = [];
      var subName = sub && sub.pop();

      if (fields.$title) {
        nodes.push(createElement('div', {
          class: 'sub-title'
        }, fields.$title));
      }

      Object.keys(fields).forEach(function (key) {
        if (key.indexOf('$') === 0) return;
        var field = fields[key];

        if (field.$sub) {
          // 子表单节点
          var subFormNodes = _this2.arrangeAllNode(formNode, field, sub ? [].concat((0, _toConsumableArray2.default)(sub), [key]) : [key]); // 将子表单包裹起来


          nodes.push(createElement('div', {
            class: 'sub'
          }, subFormNodes));
        } else if (subName) {
          // 子表单下的node
          nodes.push((0, _utils.getChild)(formNode, subName.split('.'))[key]);
        } else {
          // 根表单下的node
          nodes.push(formNode.root[key]);
        }
      });
      return nodes;
    }
  }, {
    key: "createFormButtons",
    value: function createFormButtons(allFormNodes) {
      var vm = this.vm,
          createElement = this.createElement;
      var labelNode = new _node.Node(vm, createElement, _node.components.label);
      var button = this.vm.$slots.hasOwnProperty('default') ? {
        component: this.vm.$slots.default,
        option: {
          native: true
        }
      } : _node.components.button;

      if (button.component instanceof Array) {
        allFormNodes.push(labelNode.createElem(button.component));
      } else {
        var buttonNode = new _node.Node(vm, createElement, _node.components.button);
        allFormNodes.push(labelNode.createElem([buttonNode.createElem()]));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var vm = this.vm,
          createElement = this.createElement;
      var schema = vm.schema;
      var nodesTopLevel = []; // 和form并列的节点

      if (schema.title) {
        nodesTopLevel.push(createElement(_node.components.title.tag, schema.title));
      }

      if (schema.description) {
        nodesTopLevel.push(createElement(_node.components.description.tag, schema.description));
      }

      if (vm.error) {
        var errorNodes = [];

        if (_node.components.error.option.native) {
          errorNodes.push(vm.error);
        }

        var errorNode = new _node.Node(vm, createElement, _node.components.error);
        nodesTopLevel.push(errorNode.createElem(errorNodes));
      } // 表单节点


      var formNode = {
        root: {} // 根表单

      };
      this.createNodesByForm(formNode, vm.fields);
      var formNodes = this.arrangeAllNode(formNode, vm.fields);
      var allFormNodes = []; //form内的所有节点，包括按钮

      allFormNodes.push(formNodes);

      if (vm.requireButtons) {
        this.createFormButtons(allFormNodes);
      }

      var formNode2 = new _form.FormNode(vm, createElement);
      nodesTopLevel.push(formNode2.createElem(allFormNodes));
      return nodesTopLevel;
    }
  }]);
  return Creator;
}(); // 因为编辑器会嵌套，每个编辑器对应不同vm


var mapCreators = new Map();
/**
 * 渲染函数
 *
 * @param {*} vm
 * @param {*} createElement
 */

function _default(vm, createElement) {
  var creator = mapCreators.has(vm);
  if (!creator) creator = new Creator(vm, createElement);
  return creator.render();
}
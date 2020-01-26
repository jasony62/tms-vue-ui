"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function addStyleClass(obj, prop, styleClass) {
  if (undefined === obj[prop]) {
    obj[prop] = [styleClass];
  } else if (Array.isArray(obj[prop])) {
    if (!obj[prop].includes(styleClass)) obj[prop].push(styleClass);
  } else if (_typeof(obj[prop]) === 'object') {
    obj[prop][styleClass] = true;
  } else if (typeof obj[prop] === 'string') {
    var regx = new RegExp(styleClass);
    if (!regx.test(obj[prop])) obj[prop] += " ".concat(styleClass);
  }

  return obj;
}

function _default(Vue) {
  Vue.component('tms-flex', {
    props: {
      direction: {
        type: String,
        default: 'row'
      },
      alignItems: {
        type: String,
        default: 'flex-start'
      },
      elasticItems: {
        type: Array
      },
      gap: {
        type: Number,
        default: 2
      }
    },
    render: function render(h) {
      var _this = this;

      var classes = ['tms-flex'];
      classes.push(this.direction === 'column' ? 'tms-flex_column' : 'tms-flex_row');
      classes.push("tms-flex_gap_".concat(this.gap));
      var items = this.$slots.default;

      if (items && items.length) {
        items.forEach(function (item, index) {
          if (undefined === item.data) item.data = {};
          addStyleClass(item.data, 'class', 'tms-flex__item');

          if (_this.elasticItems && _this.elasticItems.length && _this.elasticItems.includes(index)) {
            addStyleClass(item.data, 'class', 'tms-flex__item_elastic');
          }
        });
      }

      return h('div', {
        class: classes,
        style: {
          alignItems: this.alignItems
        }
      }, items);
    }
  });
}
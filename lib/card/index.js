"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _default(Vue) {
  Vue.component('tms-card', {
    props: {
      height: {
        type: String
      },
      thumb: {
        type: String
      },
      title: {
        type: String
      },
      desc: {
        type: String
      }
    },
    render: function render() {
      var h = arguments[0];
      var slots = this.$slots;
      var _this$$props = this.$props,
          thumb = _this$$props.thumb,
          title = _this$$props.title,
          desc = _this$$props.desc;
      if (thumb === '') thumb = null;
      return h("div", {
        "class": "tms-card"
      }, [slots.header ? h("header", [slots.header]) : '', h("main", [h("tms-flex", {
        "props": _objectSpread({}, {
          elasticItems: [1]
        })
      }, [h("div", {
        "class": "tms-card__thumb"
      }, [slots.thumb ? slots.thumb : h("img", {
        "attrs": {
          "src": thumb
        }
      })]), h("div", [h("tms-flex", {
        "props": _objectSpread({}, {
          direction: 'column',
          elasticItems: [1]
        })
      }, [h("div", {
        "class": "tms-card__title"
      }, [slots.title ? slots.title : title]), h("div", {
        "class": "tms-card__desc"
      }, [slots.desc ? slots.desc : desc]), slots.bottom ? h("div", {
        "class": "tms-card__bottom"
      }, [slots.bottom]) : ''])])])]), slots.footer ? h("footer", [slots.footer]) : '']);
    }
  });
}
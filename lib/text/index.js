"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(Vue) {
  Vue.component('tms-text', {
    props: {
      lines: {
        type: Number
      },
      linesSm: {
        type: Number
      }
    },
    render: function render() {
      var h = arguments[0];
      var slots = this.$slots;
      var classes = ['tms-text'];
      if (typeof this.lines === 'number' && this.lines > 0) classes.push("tms-text_lines_".concat(this.lines));
      if (typeof this.linesSm === 'number' && this.linesSm > 0) classes.push("tms-text_lines-sm_".concat(this.linesSm));
      return h("div", (0, _babelHelperVueJsxMergeProps.default)([{}, {
        class: classes
      }]), [slots.default]);
    }
  });
}
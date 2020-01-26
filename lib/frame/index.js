"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default2;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default2(Vue) {
  Vue.component('tms-frame', {
    props: {
      display: {
        type: Object,
        default: function _default() {
          return {
            header: true,
            footer: true,
            left: true,
            right: true
          };
        }
      },
      displaySm: {
        type: Object,
        default: function _default() {
          return {
            header: true,
            footer: true,
            left: false,
            right: false
          };
        }
      },
      backColor: {
        type: String,
        default: '#f0f3f6'
      },
      headerColor: {
        type: String,
        default: '#f0f3f6'
      },
      headerMinHeight: {
        type: String,
        default: '32px'
      },
      leftColor: {
        type: String,
        default: '#f0f3f6'
      },
      leftWidth: {
        type: String,
        default: '25%'
      },
      leftWidthSm: {
        type: String,
        default: '100%'
      },
      centerColor: {
        type: String,
        default: '#fff'
      },
      centerMargin: {
        type: String,
        default: '0 8px'
      },
      centerMarginSm: {
        type: String,
        default: ''
      },
      rightColor: {
        type: String,
        default: '#f0f3f6'
      },
      rightWidth: {
        type: String,
        default: '25%'
      },
      rightWidthSm: {
        type: String,
        default: '100%'
      },
      footerColor: {
        type: String,
        default: '#f0f3f6'
      },
      footerMinHeight: {
        type: String,
        default: '32px'
      },
      mainDirection: {
        type: String,
        default: 'row'
      },
      mainDirectionSm: {
        type: String,
        default: 'row'
      }
    },
    methods: {
      adjust: function adjust() {
        var props = this.$props;
        var elMain = this.$el.querySelector('.tms-frame__main');

        if (elMain) {
          if (this.isSmallScreen) {
            elMain.classList.remove("tms-frame__main_".concat(props.mainDirection));
            elMain.classList.add("tms-frame__main_".concat(props.mainDirectionSm));
          } else {
            elMain.classList.remove("tms-frame__main_".concat(props.mainDirectionSm));
            elMain.classList.add("tms-frame__main_".concat(props.mainDirection));
          }
        }

        var elCenter = this.$el.querySelector('.tms-frame__main__center');

        if (elCenter) {
          if (this.isSmallScreen) {
            elCenter.style.margin = props.centerMarginSm;
          } else {
            elCenter.style.margin = props.centerMargin;
          }
        }

        var elLeft = this.$el.querySelector('.tms-frame__main__left');

        if (elLeft) {
          elLeft.style.width = this.isSmallScreen ? props.leftWidthSm : props.leftWidth;
        }

        var elRight = this.$el.querySelector('.tms-frame__main__right');

        if (elRight) {
          elRight.style.width = this.isSmallScreen ? props.rightWidthSm : props.rightWidth;
        }
      }
    },
    data: function data() {
      return {
        isSmallScreen: false
      };
    },
    computed: {
      responsiveDisplay: function responsiveDisplay() {
        return this.isSmallScreen ? this.displaySm : this.display;
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.isSmallScreen = window.screen && window.screen.width <= 768;
      window.addEventListener('resize', function () {
        _this.isSmallScreen = window.screen && window.screen.width <= 768;
        Vue.nextTick(function () {
          _this.adjust();
        });
      });
      Vue.nextTick(function () {
        _this.adjust();
      });
    },
    render: function render() {
      var h = arguments[0];
      var slots = this.$slots;
      var props = this.$props;
      var headerStyle = {
        backgroundColor: props.headerColor
      };
      if (!slots.header) headerStyle.minHeight = props.headerMinHeight;
      var footerStyle = {
        backgroundColor: props.footerColor
      };
      if (!slots.footer) footerStyle.minHeight = props.footerMinHeight;
      var responsiveDisplay = this.responsiveDisplay;
      return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
        "class": "tms-frame"
      }, {
        style: {
          backgroundColor: props.backColor
        }
      }]), [responsiveDisplay.header ? h("header", (0, _babelHelperVueJsxMergeProps.default)([{
        "class": "tms-frame__header"
      }, {
        style: headerStyle
      }]), [slots.header]) : '', h("main", {
        "class": "tms-frame__main"
      }, [responsiveDisplay.left ? h("section", (0, _babelHelperVueJsxMergeProps.default)([{
        "class": "tms-frame__main__left"
      }, {
        style: {
          backgroundColor: props.leftColor,
          width: props.leftWidth
        }
      }]), [slots.left]) : '', h("section", (0, _babelHelperVueJsxMergeProps.default)([{
        "class": "tms-frame__main__center"
      }, {
        style: {
          backgroundColor: props.centerColor,
          margin: props.centerMargin,
          ref: 'center'
        }
      }]), [slots.center]), responsiveDisplay.right ? h("section", (0, _babelHelperVueJsxMergeProps.default)([{
        "class": "tms-frame__main__right"
      }, {
        style: {
          backgroundColor: props.rightColor,
          width: props.rightWidth
        }
      }]), [slots.right]) : '']), responsiveDisplay.footer ? h("footer", (0, _babelHelperVueJsxMergeProps.default)([{
        "class": "tms-frame__footer"
      }, {
        style: footerStyle
      }]), [slots.footer]) : '']);
    }
  });
}
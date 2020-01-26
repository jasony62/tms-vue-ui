"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

require("vant/es/button/style");

var _button = _interopRequireDefault(require("vant/es/button"));

require("vant/es/icon/style");

var _icon = _interopRequireDefault(require("vant/es/icon"));

require("vant/es/cell-group/style");

var _cellGroup = _interopRequireDefault(require("vant/es/cell-group"));

require("vant/es/field/style");

var _field = _interopRequireDefault(require("vant/es/field"));

require("vant/es/toast/style");

var _toast = _interopRequireDefault(require("vant/es/toast"));

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_vue.default.use(_button.default).use(_icon.default).use(_cellGroup.default).use(_field.default).use(_toast.default);

var idCounter = 0;

var Login =
/*#__PURE__*/
function () {
  function Login(schema, fnCaptcha, fnToken) {
    _classCallCheck(this, Login);

    this.schema = schema;
    this.fnCaptcha = fnCaptcha;
    this.fnToken = fnToken;
    this.captchaId = "captcha-".concat(++idCounter);
  }

  _createClass(Login, [{
    key: "showAsDialog",

    /**
     * 以对话框的方式打开
     *
     * @param {Array} schema
     * @param {*} onFail
     */
    value: function showAsDialog(onFail) {
      var dialog = new _vue.default(this.component);
      return dialog.showAsDialog(onFail);
    }
    /**
     *
     * @param {*} Vue
     * @param {*} options
     */

  }, {
    key: "component",
    get: function get() {
      var h = this.$createElement;
      var loginData = {};
      var schema = this.schema,
          fnCaptcha = this.fnCaptcha,
          fnToken = this.fnToken,
          captchaId = this.captchaId;
      return {
        props: {
          onSuccess: {
            type: Function
          },
          onFail: {
            type: Function
          }
        },
        methods: {
          refresh: function refresh() {
            if (typeof fnCaptcha === 'function') {
              var eleCaptcha = document.getElementById(captchaId);

              if (eleCaptcha) {
                fnCaptcha().then(function (response) {
                  var code = response.code,
                      result = response.result;

                  if (code !== 0) {
                    result = '<div style="background:#f5f5f5;color:red;text-align:center;font-size:14px;line-height:44px;">获取错误</div>';
                  }

                  eleCaptcha.innerHTML = result;
                });
              }
            }
          },
          login: function login() {
            var _this = this;

            fnToken(loginData).then(function (response) {
              var code = response.code,
                  result = response.result,
                  msg = response.msg;

              if (code !== 0) {
                _this.refresh();

                return typeof _this.onFail === 'function' ? _this.onFail(response) : (0, _toast.default)(msg);
              }

              if (_this.asDialog) _this.$emit('success', result.access_token);
              if (typeof _this.onSuccess === 'function') _this.onSuccess(result.access_token);
            });
          },
          showOverlay: function showOverlay() {
            var ele = document.createElement('div');
            ele.setAttribute('class', 'tms-login__modal');
            document.body.appendChild(ele);
          },
          removeOverlay: function removeOverlay() {
            var ele = document.querySelector('.tms-login__modal');
            document.body.removeChild(ele);
          },
          showAsDialog: function showAsDialog(onFail) {
            var _this2 = this;

            this.asDialog = true;
            this.onFail = onFail;
            this.$mount();
            this.$el.classList.add('modal');
            document.body.appendChild(this.$el);
            this.showOverlay();
            return new Promise(function (resolve) {
              _this2.$once('success', function (token) {
                document.body.removeChild(_this2.$el);

                _this2.removeOverlay();

                resolve(token);
              });
            });
          }
        },
        mounted: function mounted() {
          this.refresh();
        },
        render: function render() {
          var _this3 = this;

          var h = arguments[0];

          var textEle = function textEle(item) {
            return h("van-cell-group", {
              "class": "tms-login__input"
            }, [h("van-field", {
              "attrs": {
                "placeholder": item.placeholder,
                "type": item.type,
                "required": true
              },
              "model": {
                value: loginData[item.key],
                callback: function callback($$v) {
                  _this3.$set(loginData, item.key, $$v);
                }
              }
            })]);
          };

          var styleCaptcha = {
            width: '150px',
            height: '44px'
          };

          var captchaEle = function captchaEle(item) {
            return h("van-cell-group", {
              "class": "flex"
            }, [h("van-field", {
              "attrs": {
                "placeholder": item.placeholder,
                "required": true
              },
              "model": {
                value: loginData[item.key],
                callback: function callback($$v) {
                  _this3.$set(loginData, item.key, $$v);
                }
              }
            }), h("div", (0, _babelHelperVueJsxMergeProps.default)([{}, {
              style: styleCaptcha
            }, {
              "attrs": {
                "id": captchaId
              }
            }])), h("van-button", {
              "attrs": {
                "type": "default"
              },
              "on": {
                "click": _this3.refresh
              }
            }, [h("van-icon", {
              "attrs": {
                "name": "replay"
              }
            })])]);
          };

          return h("div", {
            "class": "tms-login__form"
          }, [schema.map(function (item) {
            return item.type === 'code' ? captchaEle(item) : textEle(item);
          }), h("div", {
            "class": "tms-login__button"
          }, [h("van-button", {
            "attrs": {
              "size": "large",
              "type": "info"
            },
            "on": {
              "click": this.login
            }
          }, ["\u767B\u5F55"])])]);
        }
      };
    }
  }], [{
    key: "install",
    value: function install(Vue, options) {
      var schema = options.schema,
          fnGetCaptcha = options.fnGetCaptcha,
          fnGetToken = options.fnGetToken;
      var login = new Login(schema, fnGetCaptcha, fnGetToken);
      Vue.component('tms-login', login.component);
    }
  }]);

  return Login;
}();
/**
 *
 * @param {*} Vue
 * @param {object} options
 * @param {object} options.fnGetCaptcha 获得验证码的回调函数，返回promise
 * @param {object} options.fnGetToken 获取accessToken的回调函数，返回promise
 */


var _default = Login;
exports.default = _default;
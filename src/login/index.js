import Vue from 'vue'
import { Icon, Button, CellGroup, Field, Toast } from 'vant'

Vue.use(Button)
  .use(Icon)
  .use(CellGroup)
  .use(Field)
  .use(Toast)

let idCounter = 0

class Login {
  constructor(schema, fnCaptcha, fnToken) {
    this.schema = schema
    this.fnCaptcha = fnCaptcha
    this.fnToken = fnToken
    this.captchaId = `captcha-${++idCounter}`
  }
  get component() {
    const loginData = {}
    const { schema, fnCaptcha, fnToken, captchaId } = this
    return {
      props: { onSuccess: { type: Function }, onFail: { type: Function } },
      methods: {
        refresh() {
          if (typeof fnCaptcha === 'function') {
            let eleCaptcha = document.getElementById(captchaId)
            if (eleCaptcha) {
              fnCaptcha().then(response => {
                let { code, result } = response
                if (code !== 0) {
                  result =
                    '<div style="background:#f5f5f5;color:red;text-align:center;font-size:14px;line-height:44px;">获取错误</div>'
                }
                eleCaptcha.innerHTML = result
              })
            }
          }
        },
        login() {
          fnToken(loginData).then(response => {
            let { code, result, msg } = response
            if (code !== 0) {
              this.refresh()
              return typeof this.onFail === 'function' ? this.onFail(response) : Toast(msg)
            }
            if (this.asDialog) this.$emit('success', result.access_token)

            if (typeof this.onSuccess === 'function') this.onSuccess(result.access_token)
          })
        },
        showOverlay() {
          let ele = document.createElement('div')
          ele.setAttribute('class', 'tms-login__modal')
          document.body.appendChild(ele)
        },
        removeOverlay() {
          let ele = document.querySelector('.tms-login__modal')
          document.body.removeChild(ele)
        },
        showAsDialog(onFail) {
          this.asDialog = true
          this.onFail = onFail
          this.$mount()
          this.$el.classList.add('modal')
          document.body.appendChild(this.$el)
          this.showOverlay()
          return new Promise(resolve => {
            this.$once('success', token => {
              document.body.removeChild(this.$el)
              this.removeOverlay()
              resolve(token)
            })
          })
        }
      },
      mounted() {
        Vue.nextTick(() => this.refresh())
      },
      render() {
        let textEle = item => (
          <van-cell-group class="tms-login__input">
            <van-field
              placeholder={item.placeholder}
              type={item.type}
              vModel={loginData[item.key]}
              required
            ></van-field>
          </van-cell-group>
        )
        let styleCaptcha = { width: '150px', height: '44px' }
        let captchaEle = item => (
          <van-cell-group class="flex">
            <van-field placeholder={item.placeholder} vModel={loginData[item.key]} required></van-field>
            <div {...{ style: styleCaptcha }} id={captchaId}></div>
            <van-button type="default" onClick={this.refresh}>
              <van-icon name="replay" />
            </van-button>
          </van-cell-group>
        )

        return (
          <div class="tms-login__form">
            {schema.map(item => (item.type === 'code' ? captchaEle(item) : textEle(item)))}
            <div class="tms-login__button">
              <van-button size="large" type="info" onClick={this.login}>
                登录
              </van-button>
            </div>
          </div>
        )
      }
    }
  }
  /**
   * 以对话框的方式打开
   *
   * @param {Array} schema
   * @param {*} onFail
   */
  showAsDialog(onFail) {
    let dialog = new Vue(this.component)
    return dialog.showAsDialog(onFail)
  }
  /**
   *
   * @param {*} Vue
   * @param {*} options
   */
  static install(Vue, options) {
    let { schema, fnGetCaptcha, fnGetToken } = options

    const login = new Login(schema, fnGetCaptcha, fnGetToken)

    Vue.component('tms-login', login.component)
  }
}
/**
 *
 * @param {*} Vue
 * @param {object} options
 * @param {object} options.fnGetCaptcha 获得验证码的回调函数，返回promise
 * @param {object} options.fnGetToken 获取accessToken的回调函数，返回promise
 */
export default Login

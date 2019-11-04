import Vue from 'vue'
import { Button, Icon, CellGroup, Field, Notify } from 'vant'

Vue.use(Button)
  .use(Icon)
  .use(CellGroup)
  .use(Field)
  .use(Notify)

class Login {
  constructor(fnCaptcha, fnToken) {
    this.fnCaptcha = fnCaptcha
    this.fnToken = fnToken
  }
  get component() {
    const loginData = {}
    const { fnCaptcha, fnToken } = this
    return {
      props: { data: { type: Array } },
      methods: {
        refresh() {
          fnCaptcha()
            .then(response => {
              let { code, result, msg } = response
              if ( code !== 0 ) {
                Notify({ type: 'danger', message: msg })
                return false
              }
              document.getElementById('captcha').innerHTML = result
            })
            .catch(e => {
              Notify({ type: 'danger', message: e })
            })
        },
        submit() {
          fnToken(loginData)
            .then(response => {
              let { code, result, msg } = response
              if (code !== 0) {
                Notify({ type: 'danger', message: msg })
                return false
              }
              let { access_token } = result
              this.$eventHub.$emit('getTokenSuccess', access_token)
            })
            .catch(e => {
              Notify({ type: 'danger', message: e })
            })
        }
      },
      mounted() {
        this.refresh()
      },
      render() {
        const data = this.data
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
          <van-cell-group class="tms-login__input flex flex__row">
            <van-field placeholder={item.placeholder} vModel={loginData[item.key]} required></van-field>
            <span {...{ style: styleCaptcha }} id="captcha"></span>
            <van-button type="default" onClick={this.refresh}>
              <van-icon name="replay" />
            </van-button>
          </van-cell-group>
        )

        return (
          <div class="tms-login__form">
            {data.map(item => (item.type == 'code' ? captchaEle(item) : textEle(item)))}
            <div class="tms-login__button">
              <van-button size="large" type="info" onClick={this.submit}>
                登录
              </van-button>
            </div>
          </div>
        )
      }
    }
  }
}

export { Login }
/**
 *
 * @param {*} Vue
 * @param {object} options
 * @param {object} options.fnGetCaptcha 获得验证码的回调函数，返回promise
 * @param {object} options.fnGetToken 获取accessToken的回调函数，返回promise
 */
export default function(Vue, options) {
  let { fnGetCaptcha, fnGetToken } = options

  const login = new Login(fnGetCaptcha, fnGetToken)

  Vue.component('tms-login', login.component)
}

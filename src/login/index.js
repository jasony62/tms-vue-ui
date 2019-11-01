import Vue from 'vue'
import { Button, Icon, CellGroup, Field, Notify } from 'vant'

Vue.use(Button)
Vue.use(Icon)
Vue.use(CellGroup)
Vue.use(Field)
Vue.use(Notify)

class Login{
    constructor(fnCaptcha, fnToken) {
        this.fncaptcha = fnCaptcha
        this.fntoken = fnToken
    }
    get component() {
        let count = 0, loginData = {}
        const { fncaptcha, fntoken } = this
        return {
            props: { data: { type: Array } },
            render: function(h) {
                const data = this.data
                const eventhub = this.$eventHub
                if (count == 0) {
                    refresh()
                    count += 1
                }
                function refresh() {
                    try {
                        fncaptcha().then(result => {
                            document.getElementById("captcha").innerHTML = result
                        })
                    } catch(e) {
                        Notify({ type: 'danger', message: e })
                    }
                    
                }
                function submit() {
                    try {
                        fntoken(loginData).then(response => {
                            console.log(loginData)
                            let { code, result, msg} = response
                            if (code != 0) {
                                Notify({ type: 'danger', message: msg })
                                return false
                            }
                            let { access_token } = result
                            eventhub.$emit('getTokenSuccess', access_token)
                        })
                    } catch(e) {
                        Notify({ type: 'danger', message: e })
                    }   
                }
                return (
                    <div class="tms-login__form">
                        {
                            data.map((item) => {
                                let textEle, codeEle
                                textEle = <van-cell-group class="tms-login__input"><van-field placeholder={item.placeholder} type={item.type} vModel={loginData[item.key]} required></van-field></van-cell-group>
                                codeEle = <van-cell-group class="tms-login__input flex flex__row"><van-field placeholder={item.placeholder} vModel={loginData[item.key]} required></van-field><span style="width: 150px; height: 44px" id="captcha"></span><van-button type="default" onClick={refresh}><van-icon name="replay" /></van-button></van-cell-group>
                                return item.type == 'code' ? codeEle : textEle
                            })
                        }
                        <div class="tms-login__button"><van-button size="large" type="info" onClick={submit}>登录</van-button></div>
                    </div>
                )
            }
        }
    }
}
export { Login }

export default Login
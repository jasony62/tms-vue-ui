import Nickname from './widget/Nickname'
import Password from './widget/Password'

class Login{
    constructor(display, getCaptcha, getToken) {
        this.display = display
        this.getCaptcha = getCaptcha
        this.getToken = getToken
    }
    get component() {
        const requireItems = this.display
        const fncaptcha = this.getCaptcha
        const fntoken = this.getToken
        return {
            data() {
                return {
                    user: {
                        nickname: '',
                        password: '',
                        pin: ''
                    }
                }
            },
            /* mounted(){
                this.refresh()
            },
            methods: {
                async refresh() {
                    console.log(this);
                    let captchaSvg = await this.getCaptcha()
                    document.getElementById("captcha").innerHTML = captchaSvg
                },
                submit(userArg) {
                    if (Object.keys(userArg).length !== 0) {
                        this.getToken(userArg).then(res => {
                            if(res.code === 0) {
                                let { access_token } = res.result
                                this.$emit('getTokenSuccess', access_token)
                            }
                        })
                    }
                }
            }, */
            render: function(h) {
                let self = this, nameComp, pwdComp, catpchComp, btnComp
                if(requireItems.nickname) {
                    nameComp =  h('div', { class: 'tms-login__input' }, [
                        h('input', {
                            class: 'el-input__inner',
                            attrs: {
                                type: "text",
                                autocomplete: "off",
                                placeholder: "用户名" 
                            },
                            domProps: {
                                value: self.user.nickname
                            },
                            on: {
                                input: function (event) {
                                    self.$emit('input', event.target.value)
                                }
                            }
                        })
                    ])
                }
                if(requireItems.password) {
                    pwdComp = h('div', { class: 'tms-login__input'}, new Password(this.user.password).editor)
                }
                return h('div', { class: 'tms-login' }, [nameComp, pwdComp])
            }
        }
    }
}
export { Login }

export default Login
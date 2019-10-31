class Password {
    constructor(password) {
        this.password = password
    }
    get editor() {
        const value = this.password
        return {
            render() {
                return (
                    <el-input placeholader="密码"  vModel={value} show-password></el-input>
                )
            }
        }
    }
}

export { Password }

export default Password
class Nickname {
    constructor(name) {
        this.name = name
    }
    get editor() {
        const value = this.name
        return {
            render() {
                return (
                    <el-input placeholader="用户名" vModel={value} clearable></el-input>
                )
            }
        }
    }
}

export { Nickname }

export default Nickname
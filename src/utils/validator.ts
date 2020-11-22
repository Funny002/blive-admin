export const isEmail = (rule: { [key: string]: any }, value: string, callback: (arg0?: Error) => void) => {
    if (!value || value == '') {
        callback(new Error('邮箱不能为空'));
    } else {
        const email = value.match(/^([\w]+)@([\w]+).(\w{2,3})$/)
        if (!email) {
            callback(new Error('邮箱格式不正确'));
        } else {
            callback()
        }
    }
}

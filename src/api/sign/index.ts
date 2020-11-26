import {__axios, Parameter} from "@/api/api";
// api
const api = '/api/sign/'
// 注册
const create = (data: { [key: string]: string } | undefined, {success, error, then}: Parameter) => __axios(api + 'create', {data, success, error, then}, 'post');
// 登录
const login = (data: { [key: string]: string } | undefined, {success, error, then}: Parameter) => __axios(api + 'login', {params: data, success, error, then}, 'get');
// 激活
const activation = (data: { [key: string]: string } | undefined, {success, error, then}: Parameter) => __axios(api + 'activation', {params: data, success, error, then}, 'get');
//
export default (type: 'login' | 'create' | 'activation', {data, success, error, then}: Parameter) => {
    data && (data['uuid'] = window.Config['uuid']);
    const func = {
        login: () => login(data, {success, error, then}),
        create: () => create(data, {success, error, then}),
        activation: () => activation(data, {success, error, then})
    }
    func[type]()
}

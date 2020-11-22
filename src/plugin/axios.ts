import Qs from 'qs';
import Axios from 'axios';
import Cookie from '@/plugin/cookie';
//
const axios = Axios.create({
    baseURL: window.Config['baseURL'],
    timeout: 1000 * 30,
    withCredentials: true,
    headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        // 'Content-Type': 'application/json; charset=utf-8'
    },
    paramsSerializer: function (params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
})

/** 请求拦截 */
axios.interceptors.request.use(config => {
    const Token = Cookie.get('Token');
    if (Token) {
        const type = config.method === "get" ? 'params' : 'data';
        if (Object.hasOwnProperty.call(config, type)) {
            config[type].Token = Token
        } else {
            config[type] = {Token};
        }
    }
    config.data && (config.data = Qs.stringify(config.data));
    return config;
}, error => {
    return Promise.reject(error)
})

/** 响应拦截 */
axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})

export default axios

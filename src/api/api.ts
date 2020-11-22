import {Method} from "axios";
import axios from "@/plugin/axios";

export interface Parameter {
    data?: { [key: string]: string };
    params?: { [key: string]: string };
    headers?: { [key: string]: string };
    then?: ((arg0: { [key: string]: any }) => void);
    error?: ((arg0: { [key: string]: any }) => void);
    success?: ((arg0: { [key: string]: any }) => void);
}

export const codeVerify = window.Config.baseURL + '/api/captcha'

// 基础 api
export const __axios = (url: string, {data, params, headers, success, error, then}: Parameter, method: Method = 'get') => {
    axios({url, data, headers, params, method}).then(({data}) => {
        if (data.code === 200) {
            success && success(data)
        } else {
            error && error(data)
        }
        then && then(data)
    }).catch()
}

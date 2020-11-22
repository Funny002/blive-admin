import {__axios, Parameter} from "@/api/api";

const api = '/api/menu/';
// 菜单
const getMenuList = (parameter: Parameter) => __axios(api + 'list', parameter, 'get');
const saveMenuList = (parameter: Parameter) => __axios(api + 'save', parameter, 'put');
const dleMenuList = (parameter: Parameter) => __axios(api + 'dle', parameter, 'delete');
const addMenuList = (parameter: Parameter) => __axios(api + 'add', parameter, 'post');
// 菜单 - 组
const getMenuGroup = (parameter: Parameter) => __axios(api + 'listGroup', parameter, 'get');
const saveMenuGroup = (parameter: Parameter) => __axios(api + 'saveGroup', parameter, 'put');
const dleMenuGroup = (parameter: Parameter) => __axios(api + 'dleGroup', parameter, 'delete');
const addMenuGroup = (parameter: Parameter) => __axios(api + 'addGroup', parameter, 'post');
// 其他
export const menuGetList = ({success, error, then}: Parameter) => __axios(api + 'getList', {success, error, then}, 'get');
//
export const menuList = (type: 'get' | 'post' | 'delete' | 'put', parameter: Parameter) => {
    const func = {
        'get': () => getMenuList(parameter),
        'put': () => saveMenuList(parameter),
        'post': () => addMenuList(parameter),
        'delete': () => dleMenuList(parameter),
    } as { [key: string]: (() => void) };
    func[type]()
}
//
export const menuGroup = (type: 'get' | 'post' | 'delete' | 'put', parameter: Parameter) => {
    const func = {
        'get': () => getMenuGroup(parameter),
        'put': () => saveMenuGroup(parameter),
        'post': () => addMenuGroup(parameter),
        'delete': () => dleMenuGroup(parameter),
    } as { [key: string]: (() => void) };
    func[type]()
}

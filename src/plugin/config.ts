import {createUUID, getUUID} from "@/utils/uuid";

window['Config'] = {
    baseURL: 'http://api.blive5.cn',
    uuid: (getUUID() || createUUID()) as string,
}

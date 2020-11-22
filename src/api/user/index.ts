import {__axios, Parameter} from "@/api/api";

const api = '/api/user/'
//
export const userGetInfo = ({success, error, then}: Parameter) => __axios(api + 'getInfo', {success, error, then}, 'get');

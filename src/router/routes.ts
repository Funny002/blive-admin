import {RouteConfig} from "vue-router";

import Sign from '@/views/basis/sign/index.vue'
import Cookie from "@/plugin/cookie";

const routes: Array<RouteConfig> = [{
    name: "Index",
    path: "/",
    component: () => import(/* webpackChunkName: "basis" */ '@/views/module/index/index.vue')
}, {
    name: 'Sign',
    path: '/sign',
    component: Sign,
    beforeEnter: (to, form, next) => {
        // 验证 token
        const Token = Cookie.get('Token')
        if (Token) {
            next({path: "/"})
        } else {
            next()
        }
    }
}]

export default routes;

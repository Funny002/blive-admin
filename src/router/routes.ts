import Cookie from "@/plugin/cookie";
import {RouteConfig} from "vue-router";

const routes: Array<RouteConfig> = [{
    name: "Index",
    path: "/",
    redirect: '/index',
    component: () => import(/* webpackChunkName: "basis" */ '@/views/theme/index.vue'),
    children: [{
        path: 'index',
        component: () => import('@/views/module/index/index.vue')
    }, {
        path: "setting",
        component: () => import('@/views/module/setting/index.vue')
    }]
}, {
    name: "activation",
    path: "/sign/activation",
    component: () => import(/* webpackChunkName: "basis" */  '@/views/basis/activation/index.vue'),
}, {
    name: 'Sign',
    path: '/sign',
    component: () => import(/* webpackChunkName: "basis" */  '@/views/basis/sign/index.vue'),
    beforeEnter: (to, form, next) => {
        // 验证 token
        const Token = Cookie.get('Token')
        if (Token) {
            next({path: "/"})
        } else {
            next()
        }
    }
}, {
    name: 'Error',
    path: '*',
    component: () => import(/* webpackChunkName: "basis" */  '@/views/basis/error/index.vue')
}]

export default routes;

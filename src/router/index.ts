import Vue from 'vue'
import routes from './routes'
import Cookie from "@/plugin/cookie"
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

/* 全局前置守卫 */
router.beforeEach((to, from, next) => {
    // 验证 token
    const Token = Cookie.get('Token')
    if (!Token && to.path !== "/sign") {
        next({path: "/sign"})
    } else {
        next()
    }
});

export default router

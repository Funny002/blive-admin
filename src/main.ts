import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '@/plugin/element-ui'
import axios from '@/plugin/axios'
import Cookie from '@/plugin/cookie'

Vue.config.productionTip = false

/* 挂载全局 */
Vue.prototype.$axios = axios
Vue.prototype.$cookie = Cookie

new Vue({router, store, render: h => h(App)}).$mount('#app')

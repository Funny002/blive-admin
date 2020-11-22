declare global {
    interface Window {
        Config: { [key: string]: string };
    }
}
//
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
//
import '@/plugin/config'
import '@/plugin/element-ui'

/* 挂载全局 */
Vue.config.productionTip = false
//
new Vue({router, store, render: h => h(App)}).$mount('#app')

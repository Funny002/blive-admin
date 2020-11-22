import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
//
import User from './User'
import Menu from './Menu'
//
Vue.use(Vuex)
export default new Vuex.Store({
    state: () => ({
        //
    }),
    getters,
    actions,
    mutations,
    modules: {
        User,
        Menu
    }
});

import Vue from 'vue'
import Vuex from 'vuex'
import User from './user/index'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({
        //
    }),
    getters,
    actions,
    mutations,
    modules: {
        User
    }
});

import {StoreOptions} from "vuex";

export default {
    namespaced: true,
    state: () => ({
        info: false
    }),
    getters: {
        getInfo: ({info}) => info,
    },
    mutations: {
        setInfo: (state, value) => (state.info = value),
    },
} as StoreOptions<any>;

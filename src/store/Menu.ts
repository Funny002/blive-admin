import {StoreOptions} from "vuex";

export default {
    namespaced: true,
    state: () => ({
        menuList: false
    }),
    getters: {
        getMenuList: ({menuList}) => menuList,
    },
    mutations: {
        setMenuList: (state, value) => (state.menuList = value),
    },
} as StoreOptions<any>;

import {createStore} from 'vuex'

export default createStore({
    state: {
        userInfo: {
            username: "体验用户",
            token: "",
            role: 0
        }
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        },
    },
    mutations: {
        changeUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
    },
    actions: {
        changeUserInfo(context, userInfo) {
            context.commit('changeUserInfo', userInfo)
        },
    },
    modules: {}
})

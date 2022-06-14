import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null
    },
    mutations: {
        authRequest(state) {
            state.status = 'loading'
        },
        authSuccess(state, user) {
            state.status = 'success'
            state.user = user
        },
        authError(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.user = null
        }
    },
    getters: {
        isLoggedIn: state => !!state.user,
        getUser: state => state.user
    },
    actions: {
        async doLogin({ commit }, user) {
            try {
                commit('authRequest')
                const resp = await axios.post(process.env.VUE_APP_BASE_URL + 'api/auth/signin', user)
                const tk = VueJwtDecode.decode(resp.data.tokenJwt)
                const userInfo = {
                    id: tk.sub,
                    token: resp.data.tokenJwt
                }
                window.localStorage.setItem('user', JSON.stringify(userInfo))
                commit('authSuccess', userInfo)
            } catch (error) {
                commit('authError')
                window.localStorage.removeItem('user')
            }
        },
        async doLogout({ commit }) {
            commit('logout')
            window.localStorage.removeItem('user')
        }
    },
    modules: {
    }
})
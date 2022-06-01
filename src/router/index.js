import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/consultas',
        name: 'Consultas',
        component: () => import(/* webpackChunkName: "about" */ '../views/Consultas.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (!store.getters.isLoggedIn && to.name !== 'Login') {
        next('/')
    }
    else if (store.getters.isLoggedIn && to.name == 'Login') {
        next('/home')
    }
    else {
        next()
    }
})

export default router
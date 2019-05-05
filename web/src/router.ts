import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Transactions from './views/Transactions.vue'
import v2Apply from './views/v2Apply.vue'
import v3End from './views/v3End.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/transactions',
            name: 'transactions',
            component: Transactions
        },
        {
            path: '/credit',
            name: 'v2apply',
            component: v2Apply
        },
        {
            path: '/end',
            name: 'v3End',
            component: v3End,
            props: true,
        }
    ]
})

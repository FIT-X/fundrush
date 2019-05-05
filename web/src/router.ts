import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
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
    path: '/v2apply',
      name: 'v2apply',
      component: v2Apply
   },
   {
    path: '/v3End',
      name: 'v3End',
      component: v3End,
      props: true,
   }
  ]
})

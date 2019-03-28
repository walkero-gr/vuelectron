import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Stacks from './views/Stacks.vue'
import Containers from './views/Containers.vue'

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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/stacks',
      name: 'stacks',
      component: Stacks
    },
    {
      path: '/containers',
      name: 'containers',
      component: Containers
    }
  ]
})

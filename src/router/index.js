import Vue from 'vue'
import VueRouter from 'vue-router'
import Titles from '../pages/Titles/Titles.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Titles',
    component: Titles
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../pages/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../pages/Register/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

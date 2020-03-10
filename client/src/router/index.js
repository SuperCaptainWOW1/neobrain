import Vue from 'vue'
import VueRouter from 'vue-router'
import Authentication from '../views/Authentication/Authentication'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Authentication',
    path: '/login',
    component: Authentication
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

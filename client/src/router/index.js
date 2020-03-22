import Vue from 'vue'
import VueRouter from 'vue-router'
import * as Auth from '@/views/Authentication'

import Chat from '@/views/Chat'
import Authentication from '@/views/Authentication/Authentication'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: Chat,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/login',
    name: 'Authentication',
    component: Authentication
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (Auth.default.user.authenticated) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router

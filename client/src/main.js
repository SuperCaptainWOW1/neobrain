import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookie from 'vue-cookie'
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'

import dateFilter from '@/filters/date.filter'

import Authentication from '@/views/Authentication'

Vue.use(VueCookie)
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO.connect('http://localhost:3000'),
//   options: { path: '/chat' }
// }))

Vue.filter('date', dateFilter)

Vue.config.productionTip = false

Authentication.checkAuthentication()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

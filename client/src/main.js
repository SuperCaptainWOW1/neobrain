import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookie from 'vue-cookie'
import vuetify from './plugins/vuetify'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

import Authentication from '@/views/Authentication'

Vue.use(VueCookie)
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO.connect('http://localhost:3000'),
  options: { path: '/chat' }
}))

Vue.config.productionTip = false

Authentication.checkAuthentication()

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

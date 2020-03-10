import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookie from 'vue-cookie'
import vuetify from './plugins/vuetify'

import Authentication from '@/views/Authentication'

Vue.use(VueCookie)

Vue.config.productionTip = false

Authentication.checkAuthentication()

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

<template>
 <main class="l-home-page">
   <appHeader :username="username" />
    <div class="l-home">
      <h4 class="white--text text-xs-center my-0">
        Neobrain
      </h4>
    </div>
  </main>
</template>

<script>
import Header from '@/components/Header.vue'

// import axios from 'axios'
// import Authentication from '@/views/Authentication'
// const API = `http://${window.location.hostname}:3000`

export default {
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    // this.getAllUsers()
  },
  methods: {
    // getAllUsers (context) {
    //   axios.get(`${API}/api/users`, {
    //     headers: {
    //       Authorization: Authentication.getAuthenticationHeader(this)
    //     },
    //     params: {
    //       id: this.$cookie.get('user_id')
    //     }
    //   }).then(({ data }) => (this.users = data))
    // }
  },
  components: {
    appHeader: Header
  }
}
</script>

<style lang="scss" scoped>
* {
  color: #fff;
}
</style>

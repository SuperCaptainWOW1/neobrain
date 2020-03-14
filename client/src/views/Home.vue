<template>
 <main class="l-home-page">
   <appHeader :username="userData.username" />
    <div class="l-home">
      <h4 class="white--text text-xs-center my-0">
        Neobrain
      </h4>
      <ul>
        <li v-for="friend of userData.friends" :key="friend._id">
          {{ friend.username }}
        </li>
      </ul>
      {{ userData }}
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
    }
  },
  computed: {
    userData () {
      return JSON.parse(this.$cookie.get('user_data'))
    }
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

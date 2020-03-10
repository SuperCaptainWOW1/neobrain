<template>
  <div>
    <h3>Hi! this is our App's Home</h3>
    <ul v-if="users != null">
      <li v-for="user in users" :key="user._id">
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
import Authentication from '@/views/Authentication'
const API = `http://${window.location.hostname}:3001`

export default {
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getAllUsers()
  },
  methods: {
    getAllUsers (context) {
      axios.get(`${API}/api/v1/users`, {
        headers: {
          Authorization: Authentication.getAuthenticationHeader(this)
        }
      }).then(({ data }) => (this.users = data))
    }
  }
}
</script>

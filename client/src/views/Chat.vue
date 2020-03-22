<template>
 <main class="home-page">
    <Header :username="userData.username" />

    <input v-model="newFriend" type="text">
    <button @click="addFriend">Add friend</button>

    <ChatFriendsList :friends="userData.friends" />
    <ChatWindow v-if="openChat"/>
  </main>
</template>

<script>
import axios from 'axios'

import Header from '@/components/Header'
import ChatFriendsList from '@/components/ChatFriendsList'
import ChatWindow from '@/components/ChatWindow'

import config from '@/config'

export default {
  data () {
    return {
      openChat: true,
      newFriend: ''
    }
  },
  methods: {
    addFriend () {
      axios.post(`${config.api}/chat/addfriend`, {
        me: this.userData.username,
        newFriend: this.newFriend
      })
    }
  },
  computed: {
    userData () {
      return JSON.parse(this.$cookie.get('user_data'))
    }
  },
  components: {
    Header,
    ChatFriendsList,
    ChatWindow
  }
}
</script>

<style lang="scss" scoped>
button {
  background-color: #575ed8;
  padding: 5px 20px;
  border-radius: 5px;
}
</style>

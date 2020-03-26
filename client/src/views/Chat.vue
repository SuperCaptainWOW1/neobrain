<template>
 <main class="home-page">
    <Header :username="userData.username" />

    <input v-model="newFriend" type="text">
    <button @click="addFriend">Add friend</button>

    <ChatFriendsList @getRoomData="data => getRoomData(data.roomId, data.friendUsername)" :friends="userData.friends" />
    <ChatWindow
      :roomId="activeRoom._id"
      :senderUsername="userData.username"
      :friendUsername="activeRoom.friendUsername"
      :messages="activeRoom.messages"
    />
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
      newFriend: '',
      userData: {
        username: '',
        friends: []
      },
      activeRoom: {
        friendUsername: '',
        messages: []
      }
    }
  },
  sockets: {
    friendAdded (friend) {
      this.updateUserData()
      this.getRoomData(friend.room_id, friend.username)
    }
  },
  created () {
    this.updateUserData()
  },
  methods: {
    addFriend () {
      if (this.newFriend.trim()) {
        axios.post(`${config.api}/chat/addfriend`, {
          me: this.userData.username,
          newFriend: this.newFriend.trim()
        })
      }
    },
    async updateUserData () {
      const userId = this.$cookie.get('user_id')

      const response = await axios.get(`${config.api}/api/user?id=${userId}`)

      this.userData = response.data
    },
    async getRoomData (roomId, friendUsername) {
      const response = await axios.get(`${config.api}/chat/room?id=${roomId}`)

      this.activeRoom = {
        ...response.data,
        friendUsername
      }
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

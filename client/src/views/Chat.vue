<template>
 <main class="home-page">
    <Header :username="userData.username" />

    <input v-model="newFriend" type="text">
    <button @click="addFriend">Add friend</button>

    <ChatFriendsList @getRoomData="data => getRoomData(data.roomId, data.friendUsername)" :friends="userData.friends" />
    <ChatWindow
      v-if="chatActive"
      :roomId="activeRoom._id"
      :senderUsername="userData.username"
      :friendUsername="activeRoom.friendUsername"
      :messages="activeRoom.messages"
    />
  </main>
</template>

<script>
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

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
      },
      chatActive: false
    }
  },
  sockets: {
    friendAdded (friend) {
      console.log(friend.room_id, friend.username)
      this.updateUserData()
      this.getRoomData(friend.room_id, friend.username)
    },
    message (d) {
      console.log(d)
    }
  },
  async mounted () {
    await this.updateUserData()
    console.log(this.userData.username)

    // eslint-disable-next-line no-new
    new VueSocketIO({
      debug: true,
      connection: SocketIO.connect('http://localhost:3000'),
      options: { path: '' }
    })

    const roomId = this.$route.query.room_id
    const friend = this.$route.query.friend

    if (roomId && friend) {
      this.getRoomData(roomId, friend)
    }
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
      this.$router.push(`/?room_id=${roomId}&friend=${friendUsername}`).catch(err => console.log('Navigation Duplicated', !!err))

      const response = await axios.get(`${config.api}/chat/room?id=${this.$route.query.room_id}`)

      this.activeRoom = {
        ...response.data,
        friendUsername
      }

      this.chatActive = true
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

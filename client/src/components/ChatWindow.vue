<template>
  <div class="chat">
    <div class="chat-window">
      <div class="friendUsername"> {{ friendUsername }} </div>
      <div class="output">
        <p v-for="m in messages" :key="m.index">
          {{ m.author }}: {{ m.content }} - {{ m.dateCreated && m.dateCreated | date }}
        </p>
      </div>
    </div>
    <input type="text" v-model="message" placeholder="Message">
    <button @click="sendChatMessage">Send</button>
  </div>
</template>

<script>
// import axios from 'axios'

// import config from '@/config'

export default {
  name: 'Chat',
  props: {
    roomId: {
      type: String
    },
    senderUsername: {
      type: String,
      required: true
    },
    friendUsername: {
      type: String
    },
    messages: {
      type: Array
    }
  },
  data: () => ({
    message: ''
  }),
  sockets: {
    connect () {
      console.log('Socket connected')
    },
    userJoinedRoom (user) {
      this.messages.push({ content: `${user} joined this chanel` })
    },
    onMessageRecieved (msg) {
      this.messages.push(msg)
    }
  },
  methods: {
    sendChatMessage () {
      if (this.friendUsername) {
        this.$socket.emit('chat_message', {
          roomId: this.roomId,
          author: this.senderUsername,
          content: this.message
        })
      }
    }
  }
}
</script>

<style scoped>
body{
    font-family: 'Nunito';
}

h2{
    font-size: 18px;
    padding: 10px 20px;
    color: #575ed8;
}

.chat{
    max-width: 600px;
    margin: 30px auto;
    border: 1px solid #ddd;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.05);
    border-radius: 2px;
}

.chat-window{
    height: 400px;
    overflow: auto;
    background: #f9f9f9;
}

.output p{
    padding: 14px 0px;
    margin: 0 20px;
    border-bottom: 1px solid #e9e9e9;
    color: #555;
}

.feedback p{
    color: #aaa;
    padding: 14px 0px;
    margin: 0 20px;
}

.output strong{
    color: #575ed8;
}

label{
    box-sizing: border-box;
    display: block;
    padding: 10px 20px;
}

input{
    padding: 10px 20px;
    box-sizing: border-box;
    background: #eee;
    border: 0;
    display: block;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #eee;
    font-family: Nunito;
    font-size: 16px;
}

button{
    background: #575ed8;
    color: #fff;
    font-size: 18px;
    border: 0;
    padding: 12px 0;
    width: 100%;
    border-radius: 0 0 2px 2px;
}

.friendUsername {
  text-align: center;
  border-bottom: 1px solid #505050;
}

</style>

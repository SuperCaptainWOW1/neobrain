<template>
 <main class="l-home-page">
   <Header :username="userData.username" />
   <button @click="openChat = true">Open chat</button>
   <Chat v-if="openChat" />
  </main>
</template>

<script>
import Header from '@/components/Header.vue'
import Chat from '@/components/Chat.vue'

export default {
  data () {
    return {
      openChat: false
    }
  },
  computed: {
    userData () {
      return JSON.parse(this.$cookie.get('user_data'))
    }
  },
  components: {
    Header,
    Chat
  }
}
</script>

<style lang="scss" scoped>
* {
  color: #fff;
}
button {
  background-color: #575ed8;
  padding: 5px 20px;
  border-radius: 5px;
}
</style>

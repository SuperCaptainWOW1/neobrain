<template>
  <div class="chat-friends">
    <div class="friend-card" @click="emitGetRoomData(f.room_id, f.username)" v-for="f of friends" :key="f.username">
      {{ f.username }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Friends-list',
  props: {
    friends: {
      type: Array,
      required: true
    }
  },
  methods: {
    emitGetRoomData (roomId, friendUsername) {
      this.$emit('getRoomData', {
        roomId,
        friendUsername
      })
    }
  }
}
</script>

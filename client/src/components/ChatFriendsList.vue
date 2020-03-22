<template>
  <div class="chat-friends">
    <div class="friend-card" v-for="f of friends" :key="f.username">
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
  data: () => ({})
}
</script>

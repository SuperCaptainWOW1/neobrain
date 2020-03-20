<template>
  <header>
    <h3>{{ username }}</h3>
    <button @click.prevent="submitSignout()">Sign out</button>
  </header>
</template>

<script>
import Authentication from '@/views/Authentication'
export default {
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    submitSignout () {
      Authentication.signout(this, '/login')
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/style";

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #272727;
}
</style>

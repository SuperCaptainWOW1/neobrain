<template>
  <header>
    <h3>{{ username }}</h3>
    <v-btn block color="red lighten-1 white--text" @click.native="submitSignout()">Sign out</v-btn>
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
}
</style>

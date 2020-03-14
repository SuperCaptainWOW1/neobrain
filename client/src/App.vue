<template>
  <v-app>
    <v-container>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/style';

#app {
  background-color: #272727;
}
.application {
  background: none;
}
</style>

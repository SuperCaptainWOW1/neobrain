<template>
  <div class="auth-container">
    <div class="auth">
      <form>
        <input label="Username" type="text" v-model="credentials.username" placeholder="Username">

        <input label="Password" type="password" v-model="credentials.password" placeholder="Password">

        <button @click.prevent="signUpVisible = true">Create account</button>
        <button @click.prevent="submitAuthentication()">Login</button>
      </form>
    </div>

    <div class="signup" v-if="signUpVisible">
      <form>
        <input label="Username" v-model="newUser.username">

        <input label="Password" v-model="newUser.password">

        <button @click.prevent="submitSignUp()">Sign Up</button>
      </form>
    </div>

    <h1>{{ errorMessage }}</h1>
  </div>
</template>

<script>
import Authentication from '@/views/Authentication'

export default {
  data () {
    return {
      signUpVisible: false,
      loginPasswordVisible: false,
      signUpPasswordVisible: false,
      credentials: {
        username: '',
        password: ''
      },
      newUser: {
        username: '',
        password: ''
      },
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    submitAuthentication () {
      Authentication.authenticate(this, this.credentials, '/')
    },

    submitSignUp () {
      Authentication.signup(this, this.newUser, '/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style";

.auth {
  background-color: $background-color;
  padding: 15px;
  margin: 45px auto;
  min-width: 272px;
  max-width: 320px;
  animation: bounceIn 1s forwards ease;
}
.signup {
  @extend .auth;
  animation: slideInFromLeft 1s forwards ease;
}

input {
  width: 100%;
}

button {
  display: block;
  width: 100%;
}
</style>

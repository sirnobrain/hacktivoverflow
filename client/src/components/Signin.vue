<template>
  <div id="signin">
    <h2>Sign In</h2>
    <input type="text" placeholder="email" v-model="username"> <br>
    <input type="password" placeholder="password" v-model="password"> <br>
    <button @click="signin">Sign In</button>
    <p>
      Do not have an account? You can <router-link to="/signup">create one</router-link>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'Signin',
    data: function () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      signin: function () {
        let signedInUser = { username: this.username, password: this.password }
        this.$store.dispatch('signin', signedInUser)
        .then(() => {
          this.$router.replace('/')
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
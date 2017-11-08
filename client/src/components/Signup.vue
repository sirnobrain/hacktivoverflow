<template>
  <div id="signup">
    <h2>Sign Up</h2>
    <p>Let's create a new account!</p>
    <input type="text" placeholder="username" v-model="username"><br>
    <input type="password" placeholder="password" v-model="password"><br>
    <button @click="signup">Sign Up</button>
    <p>already have one? back to <router-link to="/signin">sign in</router-link></p>
  </div>
</template>

<script>
  export default {
    name: 'Signup',
    data: function () {
      return {
        password: '',
        username: ''
      }
    },
    methods: {
      signup: function () {
        let signedUpUser = { username: this.username, password: this.password }
        this.$store.dispatch('signup', signedUpUser)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
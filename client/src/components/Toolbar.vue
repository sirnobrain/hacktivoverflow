<template>
<div>
  <md-toolbar class="md-dense">
    <md-button @click="goHome">
      H8Oflow
    </md-button>
    <span style="flex: 1"></span>

    <md-button id="ask" 
    class="md-icon-button" v-show="user.isLoggedIn" 
    @click="askQuestion">
      <md-icon>add</md-icon>
      <md-tooltip md-direction="bottom">Ask</md-tooltip>
    </md-button>

    <md-button class="md-icon-button" v-show="user.isLoggedIn" @click="signout">
      <md-icon>power_settings_new</md-icon>
      <md-tooltip md-direction="bottom">Sign Out</md-tooltip>
    </md-button>

    <md-button class="md-dense" v-show="!user.isLoggedIn" @click="signin">
      Sign In
    </md-button>

    <md-button class="md-dense md-raised" v-show="!user.isLoggedIn" @click="signup">
      Sign Up
    </md-button>
  </md-toolbar>

  <md-dialog md-open-from="#ask" md-close-to="#ask" ref="ask-question" @close="askClosed">
    <md-dialog-title>Ask New Question</md-dialog-title>

    <md-dialog-content>
      <form>
        <md-input-container>
          <label>Title</label>
          <md-input v-model="title"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Text</label>
          <md-textarea v-model="text" ></md-textarea>
        </md-input-container>

        <md-chips v-model="tags" md-input-placeholder="#Tags"></md-chips>
      </form>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-raised md-primary" @click="cancelAsk">Cancel</md-button>
      <md-button class="md-raised md-primary" @click="postQuestion">Ask</md-button>
    </md-dialog-actions>
  </md-dialog>
</div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'Toolbar',
  data () {
    return {
      title: '',
      text: '',
      tags: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    askQuestion: function () {
      this.$refs['ask-question'].open()
    },
    cancelAsk: function () {
      this.$refs['ask-question'].close()
    },
    postQuestion: function () {
      const askedQuestion = {
        title: this.title,
        text: this.text,
        tags: this.tags.join(';')
      }

      this.$store.dispatch('postQuestion', askedQuestion)
      .then(data => {
        this.$refs['ask-question'].close()
      })
      .catch(err => {
        console.log(err)
      })
    },
    askClosed () {
      this.title = ''
      this.text = ''
      this.tags = []
    },
    goHome: function () {
      this.$router.push('/')
    },
    signout: function () {
      this.$store.dispatch('signout')
      .then(() => {
        this.$router.replace('/')
      })
      .catch(err => {
        console.log(err)
      })
    },
    signin: function () {
      this.$router.push('/signin')
    },
    signup: function () {
      this.$router.push('/signup')
    }
  }
}
</script>

<style>
</style>

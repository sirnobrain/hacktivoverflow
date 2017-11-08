<template>
  <md-card>
    <md-card-header>
      <md-avatar class="md-avatar-icon">
        <md-icon>person</md-icon>
      </md-avatar>
      <div class="md-title">Answered by</div>
      <div class="md-subhead"><span>{{ answer.author.username }}</span></div>
    </md-card-header>

    <md-card-content>
      {{ answer.text }}
    </md-card-content>

    <md-card-actions>
      <div class="card-action">
      <md-button class="md-icon-button" @click="downvoteAnswer(answer._id)">
        <md-icon>thumb_down</md-icon>
      </md-button>
      <span>{{answer.downvote.length}}</span>
      </div>
      <div class="card-action">
      <md-button class="md-icon-button" @click="upvoteAnswer(answer._id)">
        <md-icon>thumb_up</md-icon>
      </md-button>
      <span><span>{{answer.upvote.length}}</span></span>
      </div>
      <div class="card-action" v-show="isAnswerDeletableByUser">
        <md-button class="md-icon-button" @click="deleteAnswer(answer._id)">
          <md-icon>delete_forever</md-icon>
        </md-button>
      </div>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: 'Answer',
  props: ['answer'],
  methods: {
    deleteAnswer (answerid) {
      this.$store.dispatch('deleteAnswer', answerid)
    },
    upvoteAnswer (answerid) {
      if (this.$store.state.user.isLoggedIn && this.isAnswerUpvotableByUser) {
        this.$store.dispatch('upvoteAnswer', answerid)
      } else if (this.$store.state.user.isLoggedIn) {
        console.log('Can not upvote answer twice')
      } else {
        console.log('Please Sign In or Sign Up to upvote')
      }
    },
    downvoteAnswer (answerid) {
      if (this.$store.state.user.isLoggedIn && this.isAnswerDownvotableByUser) {
        this.$store.dispatch('downvoteAnswer', answerid)
      } else if (this.$store.state.user.isLoggedIn) {
        console.log('Can not downvote twice')
      } else {
        console.log('Please Sign In or Sign Up to downvote')
      }
    }
  },
  computed: {
    isAnswerDeletableByUser () {
      if (this.$store.state.user._id) {
        return this.$store.state.user._id === this.answer.author._id
      } else {
        return false
      }
    },
    isAnswerUpvotableByUser () {
      return this.answer.upvote.indexOf(this.$store.state.user._id) === -1
    },
    isAnswerDownvotableByUser () {
      return this.answer.downvote.indexOf(this.$store.state.user._id) === -1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-action  {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
}
</style>

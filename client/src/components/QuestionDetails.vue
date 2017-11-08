<template>
  <md-card id="question-details">

    <md-card-area>
      <md-card-header>
        <md-avatar class="md-avatar-icon">
          <md-icon>person</md-icon>
        </md-avatar>
        <div class="md-title">{{ question.title }}</div>
        <div class="md-subhead">by <span>{{ question.author.username }}</span></div>
      </md-card-header>

      <md-card-content>
        {{ question.text }}
      </md-card-content>
    </md-card-area>

    <md-card-content v-show="this.$store.state.user.isLoggedIn">
      <form>
        <md-input-container>
          <label>Your Answer ...</label>
          <md-textarea v-model="answerSubmitted"></md-textarea>
        </md-input-container>
      </form>
      <md-card-actions>
        <md-button class="md-dense md-raised" @click="submitAnswer(question._id)">
          Submit Answer
        </md-button>
      </md-card-actions>
    </md-card-content>

    <Answer v-for="answer in question.answers" :key="answer._id" :answer="answer"/>
  </md-card>

</template>

<script>
import Answer from '@/components/Answer'

export default {
  name: 'QuestionDetails',
  components: {Answer},
  data () {
    return {
      answerSubmitted: ''
    }
  },
  computed: {
    question () {
      return this.$store.getters.getQuestionById(this.$route.params.questionid)
    }
  },
  methods: {
    submitAnswer (questionid) {
      const payload = {
        questionid: questionid,
        text: this.answerSubmitted
      }
      this.$store.dispatch('postAnswer', payload)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#question-details {
  width: 61.2%;
  margin: 0 auto;
}
.card-action  {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
}
</style>

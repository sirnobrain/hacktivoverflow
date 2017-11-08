<template>
  <div id="home">
    <Question id="question"
    v-for="question in questions" 
    :key="question._id" 
    :question="question"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Question from '@/components/Question'

export default {
  name: 'Home',
  computed: {
    ...mapState(['msg', 'user', 'questions'])
  },
  components: {Question}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#question {
  width: 50%;
  margin: 0 auto;
  margin-bottom: 16px;
}
</style>

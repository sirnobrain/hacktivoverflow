<template>
  <md-card md-with-hover>
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
        <div id="tags"><span class="tag" v-for="tag in question.tags"> #{{tag}}</span></div>
      </md-card-content>
    </md-card-area>

    <md-card-actions>
      <div class="card-action">
        <md-button class="md-icon-button">
          <md-icon>comment</md-icon>
          <md-tooltip md-direction="bottom">Number of Answers</md-tooltip>
        </md-button>
        <span>{{question.answers.length}}</span>
      </div>
      <div class="card-action">
        <md-button class="md-icon-button" @click="downvoteQuestion(question._id)">
          <md-icon>thumb_down</md-icon>
          <md-tooltip md-direction="bottom">Downvote</md-tooltip>
        </md-button>
        <span>{{question.downvote.length}}</span>
      </div>
      <div class="card-action">
        <md-button class="md-icon-button" @click="upvoteQuestion(question._id)">
          <md-icon>thumb_up</md-icon>
          <md-tooltip md-direction="bottom">Upvote</md-tooltip>
        </md-button>
        <span><span>{{question.upvote.length}}</span></span>
      </div>

      <span style="flex: 1"></span>

      <div class="card-action" v-show="isEditableByUser">
        <md-button class="md-icon-button" @click="editQuestion(question._id)">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Edit</md-tooltip>
        </md-button>
      </div>

      <div class="card-action" v-show="isEditableByUser">
        <md-button class="md-icon-button" @click="deleteQuestion(question._id)">
          <md-icon>delete_forever</md-icon>
          <md-tooltip md-direction="bottom">Delete</md-tooltip>
        </md-button>
      </div>

      <router-link :to="`/question/${question._id}`">
        <md-button class="md-raised">
          Details
        </md-button>
      </router-link>
    </md-card-actions>

    <md-dialog md-open-from="#edit" md-close-to="#edit" ref="edit-question" @close="editClosed">
      <md-dialog-title>Ask New Question</md-dialog-title>

      <md-dialog-content>
        <form>
          <md-input-container>
            <label>Title</label>
            <md-input v-model="titleEdit"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Text</label>
            <md-textarea v-model="textEdit" ></md-textarea>
          </md-input-container>

          <md-chips v-model="tagsEdit" md-input-placeholder="#Tags"></md-chips>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="cancelEdit">Cancel</md-button>
        <md-button class="md-raised md-primary" @click="postEdit(question._id)">Post Edit</md-button>
      </md-dialog-actions>
    </md-dialog>
  </md-card>
</template>

<script>
export default {
  name: 'Question',
  props: ['question'],
  data () {
    return {
      titleEdit: this.question.title,
      textEdit: this.question.text,
      tagsEdit: this.question.tags
    }
  },
  methods: {
    deleteQuestion (questionid) {
      this.$store.dispatch('deleteQuestion', questionid)
    },
    upvoteQuestion (questionid) {
      if (this.$store.state.user.isLoggedIn && this.isUpvotableByUser) {
        this.$store.dispatch('upvoteQuestion', questionid)
      } else if (this.$store.state.user.isLoggedIn) {
        console.log('Can not upvote twice')
      } else {
        console.log('Please Sign In or Sign Up to upvote')
      }
    },
    downvoteQuestion (questionid) {
      if (this.$store.state.user.isLoggedIn && this.isDownvotableByUser) {
        this.$store.dispatch('downvoteQuestion', questionid)
      } else if (this.$store.state.user.isLoggedIn) {
        console.log('Can not downvote twice')
      } else {
        console.log('Please Sign In or Sign Up to downvote')
      }
    },
    editQuestion (questionid) {
      this.$refs['edit-question'].open()
    },
    cancelEdit () {
      this.$refs['edit-question'].close()
    },
    postEdit (questionid) {
      const editedQuestion = {
        title: this.titleEdit,
        text: this.textEdit,
        tags: this.tagsEdit.join(';')
      }

      const payload = {
        questionid: questionid,
        editedQuestion: editedQuestion
      }

      this.$store.dispatch('editQuestion', payload)
      .then(data => {
        this.$refs['edit-question'].close()
      })
      .catch(err => {
        console.log(err)
      })
    },
    editClosed () {
      this.titleEdit = this.question.title
      this.textEdit = this.question.text
      this.tagsEdit = this.question.tags
    }
  },
  computed: {
    isEditableByUser () {
      if (this.$store.state.user._id) {
        return this.$store.state.user._id === this.question.author._id
      } else {
        return false
      }
    },
    isUpvotableByUser () {
      return this.question.upvote.indexOf(this.$store.state.user._id) === -1
    },
    isDownvotableByUser () {
      return this.question.downvote.indexOf(this.$store.state.user._id) === -1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tags {
  text-align: right;
}
.card-action  {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
}
</style>

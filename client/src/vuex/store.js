import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({ baseURL: 'http://localhost:3000/' })

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    msg: `Hello, there ...`,
    user: {
      isLoggedIn: false,
      _id: null,
      username: null,
      jwtoken: null
    },
    questions: []
  },
  getters: {
    getQuestionById (state, getters) {
      return function (questionid) {
        return state.questions.find(question => question._id === questionid)
      }
    }
  },
  mutations: {
    setUser (state, user) {
      state.user.isLoggedIn = user.isLoggedIn
      state.user._id = user._id
      state.user.username = user.username
      state.user.jwtoken = user.jwtoken
    },
    destroyUser (state, user) {
      state.user.isLoggedIn = false
      state.user._id = null
      state.user.username = null
      state.user.jwtoken = null
    },
    addQuestionToStore (state, question) {
      state.questions.unshift(question)
    },
    deleteQuestion (state, questionid) {
      const idx = state.questions.findIndex(question => question._id === questionid)
      state.questions.splice(idx, 1)
    },
    upvoteQuestion (state, questionid) {
      const idx = state.questions.findIndex(question => question._id === questionid)
      if (state.questions[idx].downvote.indexOf(state.user._id) !== -1) {
        const voteIdx = state.questions[idx].downvote.findIndex(id => id === state.user._id)
        state.questions[idx].downvote.splice(voteIdx, 1)
      }

      state.questions[idx].upvote.push(state.user._id)
    },
    downvoteQuestion (state, questionid) {
      const idx = state.questions.findIndex(question => question._id === questionid)
      if (state.questions[idx].upvote.indexOf(state.user._id) !== -1) {
        const voteIdx = state.questions[idx].upvote.findIndex(id => id === state.user._id)
        state.questions[idx].upvote.splice(voteIdx, 1)
      }
      state.questions[idx].downvote.push(state.user._id)
    },
    deleteAnswer (state, answerid) {
      state.questions.map(question => {
        const idx = question.answers.findIndex(answer => answer._id === answerid)
        if (idx !== -1) question.answers.splice(idx, 1)
      })
    },
    upvoteAnswer (state, answerid) {
      state.questions.map(question => {
        const idx = question.answers.findIndex(answer => answer._id === answerid)
        if (idx !== -1) {
          if (question.answers[idx].downvote.indexOf(state.user._id !== -1)) {
            const voteIdx = question.answers[idx].downvote.findIndex(id => id === state.user._id)
            question.answers[idx].downvote.splice(voteIdx, 1)
          }
          question.answers[idx].upvote.push(state.user._id)
        }
      })
    },
    downvoteAnswer (state, answerid) {
      state.questions.map(question => {
        const idx = question.answers.findIndex(answer => answer._id === answerid)
        if (idx !== -1) {
          if (question.answers[idx].upvote.indexOf(state.user._id !== -1)) {
            const voteIdx = question.answers[idx].upvote.findIndex(id => id === state.user._id)
            question.answers[idx].upvote.splice(voteIdx, 1)
          }
          question.answers[idx].downvote.push(state.user._id)
        }
      })
    }
  },
  actions: {
    editQuestion (context, payload) {
      return new Promise((resolve, reject) => {
        http.put(`/question/${payload.questionid}`, payload.editedQuestion, {headers: {'jwtoken': context.state.user.jwtoken}})
        .then(response => {
          location.reload()
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    upvoteAnswer (context, answerid) {
      return new Promise((resolve, reject) => {
        http.put(`/answer/upvote/${answerid}`, {}, {headers: {'jwtoken': context.state.user.jwtoken}})
        .then(response => {
          context.commit('upvoteAnswer', answerid)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    downvoteAnswer (context, answerid) {
      return new Promise((resolve, reject) => {
        http.put(`/answer/downvote/${answerid}`, {}, {headers: {'jwtoken': context.state.user.jwtoken}})
        .then(response => {
          context.commit('downvoteAnswer', answerid)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    deleteAnswer (context, answerid) {
      return new Promise((resolve, reject) => {
        http.delete(`/answer/${answerid}`, {headers: {'jwtoken': context.state.user.jwtoken}})
        .then(response => {
          context.commit('deleteAnswer', answerid)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    postAnswer (context, payload) {
      return new Promise((resolve, reject) => {
        http.post(`/answer/${payload.questionid}`, {text: payload.text}, {headers: {'jwtoken': context.state.user.jwtoken}})
        .then(response => {
          location.reload()
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    upvoteQuestion (context, questionid) {
      return new Promise((resolve, reject) => {
        http.put(`/question/upvote/${questionid}`, {}, {headers: {'jwtoken': context.state.user.jwtoken}})
        .then(response => {
          context.commit('upvoteQuestion', questionid)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    downvoteQuestion (context, questionid) {
      return new Promise((resolve, reject) => {
        http.put(`/question/downvote/${questionid}`, {}, {headers: {'jwtoken': context.state.user.jwtoken}})
        .then(response => {
          context.commit('downvoteQuestion', questionid)
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    deleteQuestion (context, questionid) {
      return new Promise((resolve, reject) => {
        http.delete(`/question/${questionid}`, {headers: {'jwtoken': context.state.user.jwtoken}})
        .then(response => {
          context.commit('deleteQuestion', questionid)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    postQuestion (context, question) {
      return new Promise((resolve, reject) => {
        http.post('/question', question, {headers: {'jwtoken': context.state.user.jwtoken}})
        .then(response => {
          location.reload()
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    getQuestions (context) {
      http.get('/question')
      .then(response => {
        const questions = response.data.payload

        questions.map((question, idx) => {
          http.get('/answer/' + question._id)
          .then(response => {
            question.answers = response.data.payload.reverse()
            context.commit('addQuestionToStore', question)
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    signup (context, signupUser) {
      return new Promise((resolve, reject) => {
        http.post('/auth/signup', signupUser)
        .then(response => {
          const user = {
            isLoggedIn: true,
            _id: response.data.payload._id,
            username: response.data.payload.username,
            jwtoken: response.data.payload.jwtoken
          }

          localStorage.setItem('jwtoken::hacktivoverflow', user.jwtoken)
          context.commit('setUser', user)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    signin (context, signinUser) {
      return new Promise((resolve, reject) => {
        http.post('/auth/signin', signinUser)
        .then(response => {
          const user = {
            isLoggedIn: true,
            _id: response.data.payload._id,
            username: response.data.payload.username,
            jwtoken: response.data.payload.jwtoken
          }

          localStorage.setItem('jwtoken::hacktivoverflow', user.jwtoken)
          context.commit('setUser', user)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    signout (context) {
      return new Promise(resolve => {
        localStorage.removeItem('jwtoken::hacktivoverflow')
        context.commit('destroyUser')
        resolve()
      })
    },
    verify (context, jwtoken) {
      return new Promise((resolve, reject) => {
        http.get('/auth/verify', {headers: {jwtoken}})
        .then(response => {
          const user = {
            isLoggedIn: true,
            _id: response.data.payload._id,
            username: response.data.payload.username,
            jwtoken: jwtoken
          }

          context.commit('setUser', user)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    }
  }
})

export default store

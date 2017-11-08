import Vue from 'vue'
import Router from 'vue-router'
import store from './../vuex/store'
import Home from '@/components/Home'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import QuestionDetails from '@/components/QuestionDetails'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/question/:questionid',
      name: 'QuestionDetails',
      component: QuestionDetails
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      meta: { authenticationPage: true }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: { authenticationPage: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.state.user.isLoggedIn
  let isAuthenticationPage = to.matched.some(record => record.meta.authenticationPage)

  if (isAuthenticated && isAuthenticationPage) next('/')
  else next()
})

export default router

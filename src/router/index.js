import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Search from '@/components/Search'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
  ]
})

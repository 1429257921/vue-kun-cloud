import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Search from '@/components/Search'
import Register from '@/components/Register'
import PersonalCenter from '@/components/PersonalCenter'
import M_Register from '@/components/mobile/M_Register'
import GoChat from '@/components/mobile/GoChat'

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
    {
      path: '/personalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    },
    {
      path: '/mobile/register',
      name: 'M_Register',
      component: M_Register
    },
    {
      path: '/mobile/chat',
      name: 'GoChat',
      component: GoChat
    },
  ]
})

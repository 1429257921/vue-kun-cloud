import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Search from '@/components/Search'
import Register from '@/components/Register'
import PersonalCenter from '@/components/PersonalCenter'
import M_Register from '@/components/mobile/Register'
import M_Login from '@/components/mobile/Login'
import M_Chat from '@/components/mobile/Chat'
import M_Me from '@/components/mobile/Me'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/pc/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/pc/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/pc/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/pc/personalCenter',
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
      name: 'M_Chat',
      component: M_Chat
    },
    {
      path: '/mobile/login',
      name: 'M_Login',
      component: M_Login
    },
    {
      path: '/mobile/me',
      name: 'M_Me',
      component: M_Me
    },
  ]
})

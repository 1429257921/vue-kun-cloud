import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Search from '@/components/Search'
import Register from '@/components/Register'
import PersonalCenter from '@/components/PersonalCenter'

import M_Register from '@/components/mobile/Register'
import M_Login from '@/components/mobile/Login'
import Chat from '@/components/mobile/Chat'
import ChatList from '@/components/mobile/ChatList'
import FriendList from '@/components/mobile/FriendList'
import Find from '@/components/mobile/Find'
import Me from '@/components/mobile/Me'

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
      name: 'Chat',
      component: Chat,
      children: [
        {
          path: '/mobile/chatList',
          name: 'ChatList',
          component: ChatList,
        },
        {
          path: '/mobile/friendList',
          name: 'FriendList',
          component: FriendList,
        },
        {
          path: '/mobile/find',
          name: 'Find',
          component: Find,
        },
        {
          path: '/mobile/me',
          name: 'Me',
          component: Me
        }
      ]
    },
    {
      path: '/mobile/login',
      name: 'M_Login',
      component: M_Login
    },

  ]
})

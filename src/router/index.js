import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AppGuest from '@/components/AppGuest'
import AppAdmin from '@/components/AppAdmin'
import GuestViewClasses from '@/components/GuestViewClasses'
import ViewProfile from '@/components/ViewProfile'
import ChangePassword from '@/components/ChangePassword'
import ViewStudent from '@/components/ViewStudent'
import Classes from '@/components/Classes'

Vue.use(Router)
Vue.use(require('vue-moment'));

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/guest',
      name: 'AppGuest',
      component: AppGuest,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/viewClasses',
      name: 'GuestViewClasses',
      component: GuestViewClasses,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/myProfile',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/student',
      name: 'ViewStudent',
      component: ViewStudent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'AppAdmin',
      component: AppAdmin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/classes',
      name: 'Classes',
      component: Classes,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

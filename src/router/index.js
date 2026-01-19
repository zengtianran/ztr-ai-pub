import { createRouter, createWebHashHistory } from 'vue-router'
import Chat from '../views/Chat.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/user',
      name: 'user-center',
      component: () => import('../views/UserCenter.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/Demo.vue')
    },
    {
      path: '/exam',
      name: 'exam',
      component: () => import('../views/Exam.vue')
    }
  ]
})

export default router

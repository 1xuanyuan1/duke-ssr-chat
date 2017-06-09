import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        meta: {
          namePage: true
        },
        component: () => import('@/views/Home/index')
      },
      {
        path: '/chat',
        name: 'Chat',
        meta: {
          namePage: true
        },
        component: () => import('@/views/Chat/index')
      },
      { path: '*', redirect: '/' }
    ]
  })
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'es6-promise/auto'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import { showAlert } from './utils'

export function createApp () {
  // create router and store instances
  const router = createRouter()
  const store = createStore()

  // sync so that route state is available as part of the store
  sync(store, router)

  Vue.prototype.$showAlert = showAlert

  const app = new Vue({
    router,
    store,
    ...App
    // render: h => h(App)
  })
  // return both the app and the router
  return { app, router, store }
}

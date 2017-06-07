// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'es6-promise/auto'
import App from './App.vue'
import { createRouter } from './router'

Vue.config.productionTip = false

export function createApp () {
  // create router instance
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
  })
  // return both the app and the router
  return { app, router }
}

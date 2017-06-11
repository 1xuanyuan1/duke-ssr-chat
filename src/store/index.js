import Vue from 'vue'
import Vuex from 'vuex'
import ls from 'store2'
import * as types from './mutation_types'

Vue.use(Vuex)

const state = {
  onlineUsers: {}, // 在线用户
  onlineCount: 0, // 在线用户数量
  messages: [], // 本地聊天记录
  user: {} // 用户信息
}

const mutations = {
  [types.USER_LOGIN] (state, user) {
    ls.set('userinfo', user)
    state.user = user
  },
  [types.GLOBAL_INIT] (state) {
    state.user = ls.get('userinfo') || {}
    state.messages = ls.get('message') || []
  },
  [types.GLOBAL_UPDATE] (state, data) {
    state.onlineCount = data.onlineCount
    state.onlineUsers = data.onlineUsers
  },
  [types.MESSAGE_UPDATE] (state, obj) {
    state.messages.push(obj)
    ls.set('message', state.messages)
  },
  [types.MESSAGE_OUTLINE] (state, list) {
    state.messages = [
      ...state.messages,
      ...list
    ]
    ls.set('message', state.messages)
  }
}

const actions = {
  fnLogin ({ commit }, user) {
    commit(types.USER_LOGIN, user)
  },
  fnGlobalInit ({ commit }) {
    commit(types.GLOBAL_INIT)
  },
  fnGlobalUpdate ({ commit }, data) {
    commit(types.GLOBAL_UPDATE, data)
  },
  fnMessageUpdate ({ commit }, obj) {
    commit(types.MESSAGE_UPDATE, obj)
  },
  fnMessageOutline ({ commit }, list) {
    commit(types.MESSAGE_OUTLINE, list)
  }
}

const getters = {
  userinfo: state => state.user,
  onlineCount: state => state.onlineCount,
  onlineUsers: state => state.onlineUsers,
  messages: state => state.messages,
  lastMessageId: state => {
    if (state.messages.length < 1) return ''
    return state.messages[state.messages.length - 1].id
  }
}

export function createStore () {
  return new Vuex.Store({
    state,
    actions,
    mutations,
    getters
  })
}

<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'
import md5 from 'md5'
import Alert from '@/components/Alert'
export default {
  name: 'app',
  data () {
    return {
      socket: null
    }
  },
  components: {
    Alert
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ]),
    connected () {
      if (!this.socket) return false
      return this.socket.connected
    }
  },
  mounted () {
    this.fnGlobalInit() // 初始化vuex信息
    this.socket = io.connect('http://localhost:3000')
    this.socket.on('connect', () => {
      console.log('connect ' + this.socket.id)
      if (this.userinfo.username) {
        let user = {
          ...this.userinfo,
          socketId: this.socket.id
        }
        this.socket.emit('login', user)
        this.fnLogin(user)
      }
    })
    this.socket.on('login', (data) => {
      if (data.user.socketId === this.socket.id) { // 若是自己登录成功则直接跳转聊天室
        this.$router.push('/chat')
      } else {
        this.$showAlert({title: `欢迎${data.user.username}来到Duke聊天室`, type: 'info'})
      }
      this.fnGlobalUpdate(data)
    })
    this.socket.on('logout', (data) => {
      if (data.user.socketId !== this.socket.id) { // 若是自己登录成功则直接跳转聊天室
        this.$showAlert({title: `${data.user.username}离开Duke聊天室`, type: 'danger'})
      }
      this.fnGlobalUpdate(data)
    })
    this.socket.on('message', (data) => {
      this.fnMessageUpdate(data)
    })
  },
  methods: {
    ...mapActions([
      'fnLogin',
      'fnGlobalInit',
      'fnGlobalUpdate',
      'fnMessageUpdate'
    ]),
    fnShowAlert (config) {
      let title, type
      if (typeof config === 'string') {
        title = config
        type = 'danger'
      } else {
        title = config.content
        type = config.type
      }
      this.$showAlert({title, type})
    },
    fnSendMessage (message) {
      let obj = {
        userid: this.userinfo.userid,
        username: this.userinfo.username,
        content: message
      }
      this.socket.emit('message', obj)
    },
    fnUserCreate (username = '') {
      if (this.connected) {
        let user = {
          userid: md5(this.socket.id + username),
          username,
          socketId: this.socket.id
        }
        this.socket.emit('login', user)
        this.fnLogin(user)
      } else {
        console.log('socket未连通')
      }
    }
  }
}
</script>

<style lang="scss">
@import '~bulma';
@import '~scss/style.scss';

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */  
[class*='-enter-active'] {
  transition: all .8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
[class*='-leave-active'] {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
/* 纵向移动 */
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
/* 横向移动 */
.h-fade-enter, .h-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

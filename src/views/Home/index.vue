<template>
  <div class="name-box">
    <div class="box">
      <h2>星云聊天室</h2>
      <input class="input" placeholder="请输入您的昵称" v-model="username" @keyup.enter="fnUserCreate"/>
      <a class="button is-info" @click="fnUserCreate">进入聊天室</a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'name',
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  mounted () {
    if (this.userinfo.username) {
      this.$router.push('/chat')
    } else {
      setTimeout(() => { // 跟socket有冲突 延时下能解决
        this.$api.login().then(res => {
          console.log('res', res)
          // 若 username 存在则已经注册了
          if (res.username) {
            this.$root.fnUserCreate(res.username, res.userid)
          } else {
            this.userid = res.userid
          }
        })
      }, 300)
    }
  },
  data () {
    return {
      username: '',
      userid: ''
    }
  },
  methods: {
    fnUserCreate () {
      this.$api.register(this.username).then(res => {
        this.$root.fnUserCreate(this.username, this.userid)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.name-box{
  width: 100vw;
  height: 100vh;
  background: rgba(#000, 0.8);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .box{
    height: 200px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    h2{
      font-size: 20px;
    }
  }
}
</style>


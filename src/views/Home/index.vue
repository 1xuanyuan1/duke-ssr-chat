<template>
  <div class="name-box">
    <div class="box">
      <h2>Duke 聊天室</h2>
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
  created () {
    if (this.userinfo.username) {
      this.$router.push('/chat')
    }
  },
  data () {
    return {
      username: ''
    }
  },
  methods: {
    fnUserCreate () {
      this.$root.fnUserCreate(this.username)
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


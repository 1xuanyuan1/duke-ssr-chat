<template>
  <div class="send-message box">
    <article class="media">
      <figure class="media-left">
        <p class="image">
          {{userinfo.username}}
        </p>
      </figure>
      <div class="media-content">
        <textarea class="textarea" placeholder="请输入你要说的话" v-model="message" @keyup.enter="fnSendMessage"></textarea>
        <nav class="level">
          <a class="button is-info" @click="fnSendMessage">发言</a>
        </nav>
      </div>
    </article>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    fnSendMessage () {
      this.$root.fnSendMessage(this.message)
      this.message = ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~scss/base.scss';
.send-message {
  max-height: 28vh;
  .image{
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: $active-color;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  .textarea{
    min-height: 80px;
  }
  .level{
    margin-top: 10px;
    text-align: right;
    justify-content: flex-end;
  }
}
</style>

<template>
  <div class="chat container">
    <div class="columns">
      <div class="column is-two-thirds">
        <message-list></message-list>
        <send-message></send-message>
      </div>
      <div class="column">
        <user-list></user-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MessageList from '@/components/MessageList'
import UserList from '@/components/UserList'
import SendMessage from '@/components/SendMessage'
export default {
  name: 'Chat',
  components: {
    UserList,
    MessageList,
    SendMessage
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  created () {
    if (!this.userinfo.username) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  padding-top: 20px;
  .columns {
    margin: 0px;
  }
}
</style>

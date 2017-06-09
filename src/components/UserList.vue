<template>
  <div class="user-list box">
    <h1 class="subtitle">当前在线人数为 <strong>{{onlineCount}}</strong></h1>
    <div class="users">
      <span v-for="(name, id) in onlineUsers" class="tag is-info">{{name}}</span>
    </div>
    
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'onlineUsers',
      'onlineCount'
    ])
  }
}
</script>
<style lang="scss" scoped>
.users {
  .tag {
    margin-right: 5px;
  }
}
</style>


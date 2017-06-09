<template>
  <div class="message-list box">
    <h1 class="subtitle">消息列表</h1>
    <div class="messages">
      <div class="message-box" v-for="(item, i) in messages" :class="{left: item.userid !== userinfo.userid, right: item.userid === userinfo.userid}">
        <article class="media">
          <figure class="media-left" v-if="item.userid !== userinfo.userid">
            <p class="image">
              <strong>{{item.username}}</strong>
            </p>
          </figure>
          <div class="media-content box">
            <div class="content">
              <p>
                {{item.content}}
              </p>
            </div>
          </div>
          <figure class="media-right" v-if="item.userid === userinfo.userid">
            <p class="image">
              <strong>{{item.username}}</strong>
            </p>
          </figure>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'messages',
      'userinfo'
    ])
  }
}
</script>
<style lang="scss" scoped>
@import '~scss/base.scss';
.message-list{
  height: calc(70vh - 60px);
  max-height: calc(70vh - 60px);
  overflow-y: auto;
  .message-box{
    margin-bottom: 10px;
    display: flex;
    &.left {
      justify-content: flex-start;
    }
    &.right {
      justify-content: flex-end;
    }
    .media {
      max-width: 80%;
      .box {
        margin-bottom: 1rem;
      }
      .image{
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: $active-color;
        display: flex;
        justify-content: center;
        align-items: center;
        strong {
          color: white;
        }
      }
    }
  }
}
</style>

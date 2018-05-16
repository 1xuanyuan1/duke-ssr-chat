'use strict'

var Chat = function () {
  // 账户列表
  LocalContractStorage.defineMapProperty(this, 'account')
  // 私聊
  LocalContractStorage.defineMapProperty(this, 'messages')
  // 初始化房间
  this.room = []
}
Chat.prototype = {
  init: function () {
    //TODO:
  },
  // 在房间内说
  publicSay (message) {
    var from = Blockchain.transaction.from
    var userinfo = this.account.get(from)
    var room = this.messages.get('room') || []
    if (!userinfo) {
      throw new Error('请先登录');
    }
    room.push({
      userid: userinfo.userid,
      username: userinfo.username,
      content: message
    })
    this.messages.put('room', room)
  },
  getPublic () {
    return this.messages.get('room') || []
  },
  register (username) {
    var from = Blockchain.transaction.from
    var userinfo = {
      username,
      userid: from
    }
    this.account.put(from, userinfo)
  },
  login () {
    var from = Blockchain.transaction.from
    return this.account.get(from) || {userid: from}
  }
}

module.exports = Chat

<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'app',
  mounted () {
    var socket = io.connect('http://localhost:3000')
    socket.on('connect', () => {
      console.log('connect ' + socket.id)
      socket.emit('login', {userid: socket.id, username: 'Duke'})
    })
    socket.on('message', function (data) {
      console.log(data)
      socket.emit('my other event', { my: 'data' })
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

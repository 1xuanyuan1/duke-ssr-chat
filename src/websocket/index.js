import io from 'socket.io-client'

const url = 'http://localhost:3000'
const socket = io.connect(url)
socket.on('connect', () => {
  console.log('connect ' + socket.id)
  socket.emit('login', {userid: socket.id, username: 'Duke'})
})
socket.on('message', function (data) {
  console.log(data)
})

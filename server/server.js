
const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  getUserName(socket);
  broadcastNewUser(socket);
  
  socket.on('chat-message', data => {
    io.emit('chat-message', data)
  })

  socket.on('typing-message', data => {
    io.emit('typing-message', data)
  })
})

function getUserName(socket) {
  socket.emit('get-name', 'Introduce yourself!')
}

function broadcastNewUser(){
  socket.emit('greet')
}

server.listen(3000, () => console.log('socket.io server up on 3000'))

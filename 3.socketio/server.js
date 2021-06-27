const express = require('express')
const path = require('path')
const app = express(); // 其实是一个监听函数

// 使用静态文件中间件，把当前目录下的 public 目录作为静态文件根目录
app.use(express.static(path.resolve(__dirname,'public')))

// 创建一个服务器对象
const server = require('http').createServer(app)

// 因为 socket.io 握手依赖 http 服务器
let io = require('socket.io')(server)

// 监听客户端传过来的连接
// 默认的命名空间就是 /
io.of('/dev').on('connection', function(socket){
    console.log('客户端连接成功')
    // 监听socket的message事件来监听客户端传过来的消息
    socket.on('message', function(message){
        console.log(message);
        // socket.send('server: '+message)
        // 向所有的客户端进行广播,所有连接此服务器的客户端都能收到此消息
        // 广播有两种：
        // 1. io.emit('message) 向所有客户端广播，包括自己
        // 2. socket.broadcast.emit('message) 向除了自己之外的客户端广播
        io.of('/dev').emit('message', message)
    })
})

// 命名空间为 /chat 
io.of('/chat').on('connection', function(socket){
    let roomName;
    console.log('客户端连接成功')
    // 监听socket的message事件来监听客户端传过来的消息
    socket.on('message', function(message){
        console.log(message);
        // socket.send('server: '+message)
        // 向所有的客户端进行广播,所有连接此服务器的客户端都能收到此消息
        // 广播有两种：
        // 1. io.emit('message) 向所有客户端广播，包括自己
        // 2. socket.broadcast.emit('message) 向除了自己之外的客户端广播
        io.of('/chat').in(roomName).emit('message', message)
    })

    // 监听客户端想进入某个房间的事件
    socket.on('join', function(name){
        // 如果进入某个房间了，则说话只有在这个房间里的人可以听到
        roomName = name;
        // socket 的join 方法可以用来进入某个房间
        socket.join(name)
    })

    socket.on('leave', function(name){
        socket.leave(name)
        roomName = undefined;
    })
})
server.listen(8080) 
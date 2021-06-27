# 1. HTTP 的架构模式
HTTP 是客户端/服务器模式中请求-响应所用的协议，在这种模式中，客户端（一般是web浏览器）向服务器提交HTTP请求，服务器响应请求的资源。

## 1.1. http 的特点
- HTTP 是半双工协议，也就是说，在同一时刻数据只能单向流动，客户端向服务器发送请求（单向的），然后服务器响应请求（单向的）
- 服务器不能主动推送数据给浏览器

# 2. 双向通信

## 2.1. 轮询
轮询是通过浏览器定时向 web 服务器发送 http 的 get 请求，服务器收到请求后，就把最新的数据发回给客户端，客户端得到数据后，将其显示出来，然后再定期的重复这一过程

> 缺点：ajax 轮询需要服务器有很快的处理速度和响应速度

## 2.2. 长轮询
- 长轮询是服务端主动向客户端发送数据的最常见方式之一
- 通过长轮询，客户端打开了一个到服务端的HTTP连接，直到返回响应数据
- 当服务端有新数据需要发送时，它会把新数据作为响应发给客户端

> long poll 需要有很高的并发能力

# 3. websocket
- WebSockets API 规范定义了一个API用以在网页浏览器和服务器建立一个 socket 连接。通俗的讲，在客户端和服务器保有一个持久的连接，两边可以在任意时间开始发送数据
- HTML5 开始提供的一种浏览器和服务器进行全双工通讯的网络技术
- 属于应用层协议，他基于 TCP 传输协议，并复用HTTP的握手通道

## 3.1. websocket 优势
- 支持双向通信，实时性更强
- 更好的二进制支持
- 较少的控制开销。连接创建后，ws客户端、服务端进行数据交换时，协议控制的数据包头部较小

## 3.2. websocket 实战
### 3.2.1. 服务端
```js
let WSServer = require('ws').Server;
let wsServer = new WSServer({port: 8888});

// 监听客户端的连接，当客户端连接上服务器之后执行对应的回调
// socket 时插座的意思，每个客户端连接上服务器之后，都会创建一个唯一的socket
wsServer.on('connection', function(socket){
    console.log('客户端已经连接')

    // 监听客户端发过来的消息
    socket.on('message', function(message){
        console.log('收到消息，',message);

        socket.send('客户端你好，我是服务端');
    })
})
```

### 3.2.2. 客户端
```js
let ws = new WebSocket('ws://localhost:8888')
// 当连接建立成功之后执行
ws.onopen = function(){
    console.log('连接成功！');

    ws.send('服务端你好，我是客户端')
}
// 当客户端收到服务器消息时执行
ws.onmessage = function(event){
    console.log('onmessage',event.data);
}
```


### 3.2.3. socket.io
Socket IO 是一个 WebSocket 库，包括了客户端的js 和服务端的 nodejs，它的目标是构建可以在不同浏览器和移动设备上使用的的实时应用。











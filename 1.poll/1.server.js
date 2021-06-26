const express = require('express')
const path = require('path')
const app = express();


app.get('/', function(req,res){
    res.sendFile(path.resolve(__dirname, 'long.html'))
})

// 验证轮询
app.get('/clock', function(req,res){
    res.end(new Date().toLocaleString())
})

// 验证长轮询
app.get('/longclock', function(req,res){
    setTimeout(() => {
        res.end(new Date().toLocaleString())
    }, 10e3)
})


app.listen(8080)
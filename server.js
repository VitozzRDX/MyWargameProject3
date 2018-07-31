var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/fabric.js-2.2.3',express.static(__dirname + '/fabric.js-2.2.3'));
app.use('/imag',express.static(__dirname + '/imag'));
app.use('/script',express.static(__dirname + '/script'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});



server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});

io.on('connection',function(socket){
    socket.on('newplayer',function(){
        console.log('np');
        socket.broadcast.emit('newplayer');
    })
});
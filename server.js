var express  = require('express');
var io       = require('socket.io');
var app      = express();

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
	res.sendfile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


io = io.listen(app, { log: false });

var sockets = {};
io.sockets.on('connection', function (socket) {
  
  var username = 'username'; //get user name from socket
  if(sockets[username]) {
    sockets[username].push(socket.id);
  }
  else {
    sockets[username] = [socket.id];
  }
  socket.emit({'msg': {'user': 'TweetDash', 'msg': 'Welcome'}});
});

var sendUpdate = function() {
  var updates = "{test}" //get twitter updates
  if(updates.length) {
    io.sockets.emit('message', "new Message");
  }
}



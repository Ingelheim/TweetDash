var express  = require('express');
var io      = require('socket.io');
var app      = express();
var port = 3700;
var twitter = require('twitter');
var util = require('util');
var twit = new twitter({
	consumer_key: 'dHAtDthdr6ZG3OlOPQBu3cuRH',
	consumer_secret: 'FNMM5iWEVS1yOOmB71OZiECJKd8h9ZeHZeDXLhlrkv0rJ0Kohw',
	access_token_key: '998546844-O0CmoBh5ZeOwfxo1btcEY4lI5QyxKf7oQDd5kvFj',
	access_token_secret: 'SMMovKIeOynju1BsaEuuHHCaC32zewlyVwLfuq4KwVd0j'
});


app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
	// 	twit.get('/statuses/show/27593302936.json', {include_entities:true}, function(data) {
	//   console.log(util.inspect(data));
	// });
	res.sendfile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

io = io.listen(app.listen(port), { log: false });

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

app.listen(8000);
console.log("App listening on port 8000");

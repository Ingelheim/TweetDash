var express  = require('express');
require("underscore");
var app      = express();
var http = require('http').Server(app);
var io      = require('socket.io')(http);
var twitter = require('twitter');
var util = require('util');
var twit = new twitter({
	consumer_key: 'dHAtDthdr6ZG3OlOPQBu3cuRH',
	consumer_secret: 'FNMM5iWEVS1yOOmB71OZiECJKd8h9ZeHZeDXLhlrkv0rJ0Kohw',
	access_token_key: '998546844-O0CmoBh5ZeOwfxo1btcEY4lI5QyxKf7oQDd5kvFj',
	access_token_secret: 'SMMovKIeOynju1BsaEuuHHCaC32zewlyVwLfuq4KwVd0j'
});


app.use(express.static(__dirname + '/public'));
// app.set('views', __dirname + '/views');
// app.set('view enigne', 'jade');

app.get('*', function(req, res) {
	var userName = req.url.replace('/', '');

	// 	twit.get('/statuses/show/27593302936.json', {include_entities:true}, function(data) {
	//   console.log(util.inspect(data));
	// });
	res.render('index.jade', {name: userName});
});


var sockets = {};
io.sockets.on('connection', function (socket) {
	console.log("conected socket "+ socket.id);

  socket.emit('service', 'getUsername');

  socket.on('username', function (username) {
		console.log("username: "+username);

    if(sockets[username]) {
      sockets[username].push(socket.id);
    }
    else {
      sockets[username] = [socket.id];
    }

    socket.emit({'msg': {'user': 'TweetDash', 'msg': 'Welcome '+username}});
  });

});

//new tweets example
var newTweets = function(username, tweets) {
  //parse functions
  //data =
  _.each(sockets[username], function(socket){
    sendUpdate(socket, data);
  });
}

//the twitter pull function calls the sendUpdate function for each connected client with all updates
//each update consists of a type and a body e.g. {'type': 'msg', 'body': 'this is my message'}
var sendUpdate = function(socket, updates) {
  _.each(updates, function(update) {
    socket.emit(update.type, update.body);
  });
}

http.listen(8000);
console.log("App listening on port 8000");

var express  = require('express');
var _ = require("underscore");
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
	// res.sendfile(__dirname +'/views/index.html');

});


var sockets = {};
io.sockets.on('connection', function (socket) {
	console.log("conected socket "+ socket.id);

  socket.emit('service', 'getUsername');

  socket.on('username', function (username) {
		console.log("username: "+username);

    if(sockets[username]) {
      sockets[username].push(socket);
    }
    else {
      sockets[username] = [socket];
    }

    newTweet(username, {'id': 0, 'user': {'screen_name': 'TweetDash'}, 'text': 'Welcome to TweetDash'});
  });

});

//new tweets example
var newTweet = function(username, tweet) {
  //parse functions
  //data =
  user = tweet['user']['screen_name'];
  text = tweet['text'];
  image = tweet['user']['profile_image_url'];

  _.each(sockets[username], function(socket){
    //the server doesn't need to know of what type the message is
    sendUpdate(socket, {'type': 'msg', 'body': {'id': tweet['id'], 'user': user, 'image': image, 'text': text}});
  });
}

//the twitter pull function calls the sendUpdate function for each connected client with all updates
//each update consists of a type and a body e.g. {'type': 'msg', 'body': 'this is my message'}
var sendUpdate = function(socket, update) {
  if(update['type'] === 'msg') {
    socket.emit(update.type, update.body);
  }
}

http.listen(8000);
console.log("App listening on port 8000");

var twitterMockupString = { created_at: 'Sat Jun 07 23:28:51 +0000 2014',
  id: 475419144301871100,
  id_str: '475419144301871104',
  text: 'Mailin: Artisanal Inbound Emails for Every Web App #nodejs http://t.co/0SyYLWKRJt',
  source: '<a href="http://www.apple.com" rel="nofollow">iOS</a>',
  truncated: false,
  in_reply_to_status_id: null,
  in_reply_to_status_id_str: null,
  in_reply_to_user_id: null,
  in_reply_to_user_id_str: null,
  in_reply_to_screen_name: null,
  user: 
   { id: 14348674,
     id_str: '14348674',
     name: 'Vincent Composieux',
     screen_name: 'vcomposieux',
     location: 'Paris, France',
     url: 'http://vincent.composieux.fr',
     description: 'Engineer at @3k1n0 - I love #Symfony, I write #PHP & #Python and use a lot of technologies',
     protected: false,
     followers_count: 448,
     friends_count: 393,
     listed_count: 33,
     created_at: 'Thu Apr 10 05:10:25 +0000 2008',
     favourites_count: 153,
     utc_offset: 7200,
     time_zone: 'Paris',
     geo_enabled: true,
     verified: false,
     statuses_count: 3436,
     lang: 'fr',
     contributors_enabled: false,
     is_translator: false,
     is_translation_enabled: false,
     profile_background_color: 'CECECE',
     profile_background_image_url: 'http://pbs.twimg.com/profile_background_images/415712635/Bois-sombre.jpg',
     profile_background_image_url_https: 'https://pbs.twimg.com/profile_background_images/415712635/Bois-sombre.jpg',
     profile_background_tile: false,
     profile_image_url: 'http://pbs.twimg.com/profile_images/453940381798117376/tOTCAj0l_normal.jpeg',
     profile_image_url_https: 'https://pbs.twimg.com/profile_images/453940381798117376/tOTCAj0l_normal.jpeg',
     profile_banner_url: 'https://pbs.twimg.com/profile_banners/14348674/1397063191',
     profile_link_color: '0084B4',
     profile_sidebar_border_color: 'DAE3E8',
     profile_sidebar_fill_color: 'F4F6F7',
     profile_text_color: '333333',
     profile_use_background_image: false,
     default_profile: false,
     default_profile_image: false,
     following: null,
     follow_request_sent: null,
     notifications: null },
  geo: null,
  coordinates: null,
  place: null,
  contributors: null,
  retweet_count: 0,
  favorite_count: 0,
  entities: 
   { hashtags: [ [Object] ],
     symbols: [],
     urls: [ [Object] ],
     user_mentions: [] },
  favorited: false,
  retweeted: false,
  possibly_sensitive: false,
  filter_level: 'medium',
  lang: 'en' }


twit.stream('user', {track:'funny'}, function(stream) {
    stream.on('data', function(data) {
      if(data['user']) {
        _.each(Object.keys(sockets), function(username){
          newTweet(username, data);
        });
      }
    });
    // Disconnect stream after five seconds
    //setTimeout(stream.destroy, 5000);
});

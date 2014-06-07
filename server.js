	var express  = require('express');
	var io      = require('socket.io');
	var app      = express();
	var twitter = require('twitter');
	var util = require('util');
	var twit = new twitter({
		consumer_key: 'dHAtDthdr6ZG3OlOPQBu3cuRH',
		consumer_secret: 'FNMM5iWEVS1yOOmB71OZiECJKd8h9ZeHZeDXLhlrkv0rJ0Kohw',
		access_token_key: '998546844-O0CmoBh5ZeOwfxo1btcEY4lI5QyxKf7oQDd5kvFj',
		access_token_secret: 'SMMovKIeOynju1BsaEuuHHCaC32zewlyVwLfuq4KwVd0j'
	});

	app.use(express.static(__dirname + '/public'));

  app.get('*', function(req, res) {;
	// 	twit.get('/statuses/show/27593302936.json', {include_entities:true}, function(data) {
  //   console.log(util.inspect(data));
  // });
		res.sendfile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

	app.listen(8000);
	console.log("App listening on port 8000");

	function initializeTwitter() {

	}

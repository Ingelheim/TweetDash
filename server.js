	var express  = require('express');
	var io      = require('socket.io');
	var app      = express();

	app.use(express.static(__dirname + '/public'));

  app.get('*', function(req, res) {
		res.sendfile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

	app.listen(8000);
	console.log("App listening on port 8000");

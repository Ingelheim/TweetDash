	var express  = require('express');
	var app      = express();

  app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

	app.listen(8000);
	console.log("App listening on port 8080");

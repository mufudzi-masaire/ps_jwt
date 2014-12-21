var express = require('express'),
		mongoose = require('mongoose'),
		bodyParser = require('body-parser'),
		path = require('path');


var app = express();
app.use(bodyParser.json());

// Headers to enables cross origin resource sharing (CORS)
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

// ROUTES
require(path.join(__dirname, '/routes/routes'))(app);

// DB
mongoose.connect('mongodb://localhost/psjwt');

// SERVER
var server = app.listen(3000, function(){
	console.log('API running on ' + server.address().port);
});

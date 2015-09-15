'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');

var app = express();

// defines middleware for app—the logic that tells express
// between the time a request is made by client but before it arrives at a route
app.use('/static', express.static(__dirname + '/public'));  


app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/blog/:title?', function(req, res){
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.send("This page is under construction!");
	} else {
		var post = posts[title] || {};
		res.render('post', { post: post});
	}
});

app.listen(3000, function() {
	console.log("The frontend server is running on port 3000!");
});
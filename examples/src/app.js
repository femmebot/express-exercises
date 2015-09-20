'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');

// Object.keys is a method that generates an array of keys from an object
// Arrays have a map method that can iterate through an array and create a new array
// Here we use a callback function that simply returns the value of each post object
var postsLists = Object.keys(posts).map(function(value) {
							         return posts[value]})

var app = express();

app.use('/static', express.static(__dirname + '/public'))

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res){
	var path = req.path;

	// this is the same as
	// res.render('index', {path: path});
	res.locals.path = path;
	res.render('index');
});

app.get('/blog/:title?', function(req, res){
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.render('blog', {posts: postsLists})
	} else {
		var post = posts[title] || {};
		res.render('post', { post: post});
	}
});

app.get('/posts', function(req, res) {
	if (req.query.raw) {
		res.json(posts);
	} else {
		res.json(postsLists);
	}
})

app.listen(3000, function() {
	console.log("The frontend server is running on port 3000!");
});

Express-Basics
==============

A web framework for node.js

 

##### Installing and Setting Up Express

To create a new node project type `npm init`

To install express.js, type `npm install express --save`. The `--save` flag
ensures that it also includes express.js as a dependency in the package.json file.

Create a simple express server application:
```
'use strict';

var express = require('express');

// we'll extend this using express' methods
// used to define application settings and routes
var app = express();

// use the GET method to route to root of our Site
// uses two parameters: first is location, second is an anonymous callback function
// the callback function takes two parameters: a request object and response object
app.get('/', function(request,response){
  response.send('Success! The callback function worked.');
});

// set up a listener on port 3000
app.listen(3000);
```
Type `node <app name>` to run the application then check localhost:3000



##### Advanced Debugging Strategies for Node Apps

[Nodemon](https://github.com/remy/nodemon)
[Node Inspector documentation](https://github.com/node-inspector/node-inspector)

To install nodemon `npm install nodemon -g`. To run nodemon, `nodemon <path to app>`.

To install node inspector `npm install node-inspector -g`, To run node-inspector, `node-inspector <path to app>`. Press PLAY button on the inspector to continue. You can set break points directly in the inspector. You can also check Request and Response objects directly in the inspector's console.

To run both node inspector and nodemon:
* Type `node-inspector`
* In a separate tab, type `nodemon --debug <path to app>` This will listen to port 5858
* You can either add break points manually through the node inspector or in the app. To add a break point in the app file, type `debugger;` and in your nodemon tab `nodemon  --debug-brk <path to app>` so it breaks on the first break point it encounters.


##### Requests and the Request Object

In node, we can add a parameter by adding `:<param>` like so:
```
app.get('/blog:title', function(req, res){
	res.send(posts);
});
```

* [The request object](http://expressjs.com/api.html#req)
* [http request methods](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)
 

##### Responses and the Response Object


* [The response object](http://expressjs.com/api.html#res)
* [http response methods](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
* [Detect device type or "bot through the request object"](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

##### Routing in Express

Core component of Express. From a user's perspective, a Route is the path the user takes to access data on the server (i.e., home, /about, /settings, etc.) From the application's perspective, a route (sometimes known as Endpoint) provides instructions to trigger a set of programming. For our purposes, the client in this case is the web browser and the routes are the URLs that you would type into the browser.

 

##### The Jade Template Engine

Templates are often called 'Views,' acting as a skeleton where the server can inject information into variables before it is sent to the client. The process is known as Template Rendering.

Popular templating languages for JavaScript include:
* Handlebars
* EJS (Embedded JavaScript)
* Jade http://jade-lang.com/

A comparison of JavaScript template engines:
[https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/)

`npm install jade --save` to install Jade and also include it as a dependency in the package.json file

Sample Jade template code:
```
doctype html
html
  head
    title Express Basics
  body
    h1 This is an awesome html page generated with Jade
    p.class1.class2.another-class(class="foobar") Some content
```
 

##### The Express Static Server

Loads styles, scripts, images and other static files to the browser

Here's an example of a simple template
```
'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');

var app = express();

// define the templating engine
app.set('view engine', 'jade');
// define the path to the templates
// use __dirname to indicate location relative to root
app.set('views', __dirname + '/templates');

app.get('/', function(req, res){
  // since we already defined jade as the view engine, we don't need to add .jade
	res.render('index');
});

app.get('/blog/:title?', function(req, res){
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.send("This page is under construction!");
	} else {
		var post = posts[title];
		res.send(post);
	}
});

app.listen(3000, function() {
	console.log("The frontend server is running on port 3000!");
});
```
To test:
* Make sure jade is installed and included as a package dependency `npm install jade -g --save`
* Run `nodemon <path to app>`
* In a separate tab run `node-inspector <path to app>` 

##### Using variables

Our sample app.js:
```
'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates')

app.get('/', function(req, res){
	res.render('index')
});

app.get('/blog/:title?', function(req, res){
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.send("This page is under construction!");
	} else {
		// quick fix if post does not exist is to create an empty variable
		var post = posts[title] || {};
		res.render('post', { post:post });  // second parameter is a variable looking for post object's post value
	}
});

app.listen(3000, function() {
	console.log("The frontend server is running on port 3000!");
});
```

Our sample post.jade template with post.title and post.description variables:
```
doctype html
html(lang="en")
  head
    title #{post.title}
  body
    section.post
      .container.text-right
        a(href="").text-faded view all
        .row
          .col-lg-8.col-lg-offset-2.text-center
            h2.section-heading #{post.title}

            hr.light

            p.text-faded
              | #{post.description}
            .article
            | #{post.description}
```

##### Scaffolding your Templates

[Jade block content inheritance](http://jade-lang.com/reference/inheritance/)

Using includes, block content, partials

layout.jade:
```
doctype html
html(lang="en")
		include ./partials/_head.jade

		body#page-top
					include ./partials/_nav.jade
			block content

```

```
// _head.jade
head
	title Landing Page
	// all static goes here!

```

```
// _nav.jade
nav#mainNav.navbar.navbar-default.navbar-fixed-top
					.container-fluid
						// Brand and toggle get grouped for better mobile display
						.navbar-header
							button.navbar-toggle.collapsed(type='button', data-toggle='collapse', data-target='#bs-example-navbar-collapse-1')
								span.sr-only Toggle navigation
								|
								span.icon-bar
								|
								span.icon-bar
								|
								span.icon-bar
							|
							a.navbar-brand.page-scroll(href='/') FitLog.io
						// Collect the nav links, forms, and other content for toggling
						#bs-example-navbar-collapse-1.collapse.navbar-collapse
							ul.nav.navbar-nav.navbar-right
								li
										a(href='/blog') Blog
								li
										a.page-scroll(href='#about') About
								li
										a.page-scroll(href='#services') Services
								|
								li
										a.page-scroll(href='#portfolio') Portfolio
								|
								li
										a.page-scroll(href='#contact') Contact
								// /.navbar-collapse
								// /.container-fluid
```

##### Serving Static Files

Use `app.use` to define middleware.
```
// defines middleware for app--the logic that tells express
// between the time a request is made by client but before it arrives at a route

app.use('/static', express.static(__dirname + '/public'));

```

##### Iteration in Jade

[Iteration](http://jade-lang.com/reference/iteration/)


##### Reference:

* [Express Website](<http://expressjs.com>)
* [Express.js API Documentation](<http://expressjs.com/4x/api.html>)

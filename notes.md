Express-Basics
==============

A web framework for node.js

 

##### Installing and Setting Up Express

To create a new node project type `npm init`

To install express.js, type `npm install express --save`. The `--save` flag
ensures that it also includes express.js as a dependency in the package.json file.

Create a simple express server applicaation:
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

To install nodemon `npm install nodemon -g`

To install node inspector `npm install node-inspector -g`



 

##### Routing in Express

Core component of Express. From a user's perspective, a Route is the path the user takes to access data on the server (i.e., home, /about, /settings, etc.) From the application's perspective, a route (sometimes known as Endpoint) provides instructions to trigger a set of programming. For our purposes, the client in this case is the web browser and the routes are the URLs that you would type into the browser.

 

##### The Jade Template Engine

 

##### The Express Static Server

Loads styles, scripts, images and otehr static files to the browser

 

##### Reference:

-   [Express Website](<http://expressjs.com>)

-   [Express.js API Documentation](<http://expressjs.com/4x/api.html>)

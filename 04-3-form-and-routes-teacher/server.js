const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const server = express();


server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + '/public'));
server.use(routes);

server.set('view engine', 'html');

nunjucks.configure('views', {
	express:server,
	autoescape: false,
	noCache: true
});

server.listen(3335);


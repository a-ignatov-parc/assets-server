#!/usr/bin/env node

var _ = require('underscore');
var fs = require('fs');
var http = require('http');
var path = require('path');
var connect = require('connect');
var program = require('commander');
var compression = require('compression');
var serveStatic = require('serve-static');

program
	.version(require('./package').version)
	.usage('[options]')
	.option('-p, --port <value>', 'The port on which the assets server will respond', function(value) {
		return parseInt(value, 10);
	}, 3000)
	.option('-H, --hostname <name>', 'The hostname the assets server will use', '0.0.0.0')
	.option('-b, --base <path>', 'The base (or root) directory from which files will be served', '.')
	.option('-m, --middleware <path>', 'This option expects a path to CommonJS module which will return function that returns an array of middlewares')

program.parse(process.argv);


var config = program.opts();
var pathToModule = path.resolve(config.middleware);
var middleware = config.middleware && fs.existsSync(pathToModule) && require(pathToModule);

var app = connect();
var server = null;

// Конфигурируем сервер.
app.use(compression());

if (middleware) {
	app.use.apply(app, middleware({
		static: serveStatic
	}, config));
}

// Запускаем сервер.
server = http.createServer(app).listen(config.port);

server.on('listening', function() {
	var info = server.address();

	console.log('Started assets server on http://' + info.address + ':' + info.port);
});

server.on('error', function(err) {
	if (err.code === 'EADDRINUSE') {
		console.error('Port ' + config.port + ' is already in use by another process.');
	} else {
		console.error(err);
	}
});

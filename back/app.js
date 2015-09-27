'use strict';
var domain = require('domain');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cloud = require('./cloud');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../front/dist')));

app.use(cloud);


// 未处理异常捕获 middleware
app.use(function(req, res, next) {
	var d = domain.create();
	d.add(req);
	d.add(res);
	d.on('error', function(err) {
		console.error('uncaughtException url=%s, msg=%s', req.url, err.stack || err.message || err);
		if(!res.finished) {
			res.statusCode = 500;
			res.setHeader('content-type', 'application/json; charset=UTF-8');
			res.end('uncaughtException');
		}
	});
	d.run(next);
});

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
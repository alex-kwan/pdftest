/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json'));
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'test',
		cookie: { secure: true }            
}));

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.post('/all_ties', routes.allTies);
app.get('/all_ties', routes.allTies);

app.get('/search/', routes.searchTies); // no params
app.get('/search/:k', routes.searchTies); // with keyword params k

app.get('/upload_tie', routes.uploadTie);
//app.post('/upload_tie', routes.uploadTie);
app.post('/upload_success', routes.uploadSuccess);

exports.server = app;

app.listen(process.env.DEPLOY_PORT || config.server.port, function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

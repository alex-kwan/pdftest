var should  = require('should');
var server = require('../app.js').server;
var config = require('../app.js').config;
var express = require('express');
var http = require('http');

module.exports = {

	pageTests:{
		setUp: function(callback){
			console.log("STARTUP")
			this.server = express.createServer();
			this.server.use(server);
			this.server.listen(config.server.port);
			this.server.on('listening',callback);	
		},

		tearDown: function(callback){
			console.log("TEARDOWN")
			this.server.close();
			callback();
		},

		"Homepage Test":function(test){
			console.log("Testing");
			var options = {
				host:config.server.host,
				port:config.server.port,
				path:'/'
			}

			request = http.get(options, function(res){

				res.on('end', function(){
					test.ok(res.statusCode.should.be.eql(200));
					test.done();
				})

			});

		}
	}
}

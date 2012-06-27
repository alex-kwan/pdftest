var Tie = require('./../models/tie.js');
var TieList = require('./tieList');
var EventEmitter = require('events').EventEmitter;

var data = [{"name":"Blue Steel", "url":"/images/tie_1.jpg"},
			{"name":"Flying Hawaiian", "url":"/images/tie_2.jpg"},
			{"name":"Red Barron", "url":"/images/tie_3.jpg"},
			{"name":"Stripey", "url":"/images/tie_4.jpg"}];

var ties = {};

var i;
for(i = 0; i < data.length; i++){
	var newTie = new Tie.Tie({name:data[i].name, imageurl:data[i].url});
	ties[newTie.get("name")] = newTie;
}


TieList.getList(function(list){
	var i;

	for(var name in list){
		ties[list[name].get("name")] = list[name];
	}

	module.exports.emit("ready", ties);

})

module.exports = new EventEmitter();

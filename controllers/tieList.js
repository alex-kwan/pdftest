var Tie = require('./../models/tie.js');

var
	http = require('http'),
	DOM = require('com.izaakschroeder.dom');

var TieList = function(){
	this.host = 'www.thetiegallery.com';
	this.path = '/GetProducts.ashx?subid=0&catid=2&color=&filters=&search=&page=';
};

TieList.prototype.getList = function(callback){
	var self = this;

	var options = {
		host: self.host,
		port: 80,
		path: self.path,
		method: "GET"
	}

	var i, list = {}, remaining = 4;
	for(i = 1; i < 5; i++){
		options.path = self.path + i;

		http.request(options, function(response) {

			DOM.parse(response, function(doc) {
				doc.querySelectorAll(".ProdItem").forEach(function(i) {

					var tie = new Tie.Tie({
							"name" : i.querySelector("h4").textContent,
							"imageurl" : "http://" + self.host + "/" + i.querySelector("a img").getAttribute("src")
						});
                    list[tie.get("name")] = tie;
				});
			});

			response.on('end', function(){

				if(--remaining === 0){
					callback(list);
				}
			});


		}).end();
	}

}

module.exports = new TieList;

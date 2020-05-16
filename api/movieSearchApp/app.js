var express = require ("express");
var app =  express();
var request = require('request');


app.use(express.static("public"));

app.set("view engine","ejs")

app.get("/results", function(req, res){
		
		var search = req.query.mname;
		request('http://www.omdbapi.com/?s=' + search + '&apikey=thewdb', function (error, response, body) {
			if(!error && response.statusCode==200){
	  			var data = JSON.parse(body);
				res.render("results",{data:data});
  			}
		});
		
});

app.get("/search", function(req, res){
		
				res.render("search");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("MovieApp Started!");
});
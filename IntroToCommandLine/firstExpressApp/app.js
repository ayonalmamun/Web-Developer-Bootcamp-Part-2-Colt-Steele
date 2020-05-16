var express = require("express");
var app = express();

app.get("/", function(req, res){
		
		res.send("Hi There");	
		
});

app.get("/habu", function(req, res){
		
		res.send("Ye I am Habu!");	
		
});
app.get("/r/:bachelor", function(req, res){
		
	console.log(req.params);
	var b = req.params.bachelor;
	res.send(b.toUpperCase());	
		
});

app.get("/r/:bachelor/comments/:id/:title", function(req, res){
		console.log(req.params);
		res.send("Nam kou miya");	
		
});

app.get("*", function(req, res){
		
		res.send("Shuka");	
		
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Hi");
});
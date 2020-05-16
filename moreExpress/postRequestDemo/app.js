var express = require ("express");
var app =  express();
var bodyParser = require("body-parser");

var friends = ["Discount","Habu","Kabila"];	

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine","ejs")

app.get("/", function(req, res){
		
		res.render("home");	
		
});

app.get("/friends", function(req, res){
			
	res.render("friends",{vaiBrothers:friends});	
		
});

app.post("/add", function(req, res){
	
	var newFrnd = req.body.newName;
	friends.push(newFrnd);
	res.redirect("friends");	
		
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("ejsDemo Started");
});
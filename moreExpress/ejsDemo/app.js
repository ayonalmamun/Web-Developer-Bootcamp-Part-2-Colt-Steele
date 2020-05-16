var express = require ("express");
var app =  express();

app.use(express.static("public"));

app.set("view engine","ejs")

app.get("/", function(req, res){
		
		res.render("home");	
		
});

app.get("/fallinlovewith/:name", function(req, res){
		var a = req.params.name;
		res.render("love",{aVar: a});	
		
});

app.get("/posts", function(req, res){
		var posts = [
			{bname: "Advanced Hacking", writer: "Locha Kayuem"},
			{bname: "Android Basics", writer: "Habu Mia"},
			{bname: "OS Concepts", writer: "Zackaria"}
		];
		res.render("posts", {posts: posts});	
		
});
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("ejsDemo Started");
});
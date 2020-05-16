var express = require("express");
var app = express();

app.get("/", function(req, res){
		
		res.send("Assignment");	
		
});

app.get("/speak/:bachelor", function(req, res){
		
		var b = req.params.bachelor.toLowerCase();
		var o = {
			habu: "Bekar",
			kabila: "Chor",
			discount : "Percentage"
		}
		var bo = o[b];
		res.send(b + " ? " + bo);	
		
});

app.get("/repeat/:msg/:number", function(req, res){
		var a = req.params.msg;
		var b = Number(req.params.number);
		var resu = "";
		for(var i=0;i<b;i++){
			resu = resu + a + " ";
		}
		res.send(resu);
});
app.get("*", function(req, res){
		
		res.send("Vul krsos!");	
		
});


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Connected backEndBasicFinale");
});
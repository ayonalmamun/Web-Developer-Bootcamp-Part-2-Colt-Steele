var request = require('request');
request('http://api.weatherstack.com/current?access_key=5e32ec2597e309d9cc7ac690a7fc466f&query=Dhaka', function (error, response, body) {
  eval(require("locus"))
	if(!error && response.statusCode==200){
	  var data = JSON.parse(body);
	  console.log(data["current"]["temperature"]);
  }
});
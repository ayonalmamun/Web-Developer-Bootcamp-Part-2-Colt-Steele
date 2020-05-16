var mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/test_cat_app', {useNewUrlParser: true});
// , useUnifiedTopology: true

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	isLazy: Boolean
});

var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the db method1
// var ace = new Cat ({
// 	name: "Nezuko",
// 	age: 1,
// 	isLazy: false
// });

// ace.save(function(err,cat){
// 	if (err){
// 		console.log("Error");
// 	}
// 	else{
// 		console.log("Saved!");
// 		console.log(cat);
// 	}
// });

Cat.create({
	name: "Lupi",
	age: 4,
	isLazy: true
},function(err,cat){
	if (err){
		console.log(err);
	}
	else{
		console.log("Inseted!");
		console.log(cat);
	}
});

Cat.find({},function(err,cats){
	if (err){
		console.log("Error");
		console.log(err);
	}
	else{
		console.log("Cat List:");
		console.log(cats);
	}
});




var mongoose = require('mongoose');
var Post = require('./models/post');
var User = require('./models/user');

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/b_demo_2', {useNewUrlParser: true});


// User.create({
// 	email: "discount@gmail.com",
// 	name: "Discount"
// });


// Post.create({
// 	title: "priceVsDiscount",
// 	content: "Price:300,Discount E:200"
// },function(err,post){
// 	User.findOne({name:"Discount"},function(err,foundUser){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			foundUser.posts.push(post);	
// 			foundUser.save(function(err,data){
// 				if(err){
// 					console.log(err);
// 				}else{
// 					console.log(data);
// 				}
// 			})
// 		}
// 	});
// });

User.findOne({name: "Discount"}).populate("posts").exec(function(err, user){
	if(err){
		console.log(err);
	}else{
		console.log(user);
	}
});


var mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/b_demo', {useNewUrlParser: true});

var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
// 	email:	"kabila@gmail.com",
// 	name: "Kabila"
// });

// newUser.posts.push({
// 	title: "Kobila",
// 	content: "Amr 1 hat e dab, pura kabjhap"
// });

// newUser.save(function(err,user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title:	"Habu modon",
// 	content: "Hala huiya thake, gaye gondho, katar jaibe bole!"
// });

// newPost.save(function(err,post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	}
// });

User.findOne({name:"Kabila"},function(err,user){
	if(err){
		console.log(err);
	}else{
		user.posts.push({
		title: "Kobita2",
		content: "Ghuddi amr jan, Ghuddi amr poran"
		});
		user.save(function(err,user){
			if(err){
				console.log(err);
			}else{
				console.log(user);
			}
		});
	}
});


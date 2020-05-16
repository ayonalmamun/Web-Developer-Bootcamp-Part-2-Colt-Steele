var express 			= require ("express"),
	app 				=  express(),
	bodyParser 			= require("body-parser")
	mongoose 			= require('mongoose')
	methodOverride 		= require('method-override'),
	expressSanitizer 	= require('express-sanitizer');


mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/blogApp', {useNewUrlParser: true});
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: 
		{
			type: Date, 
			default: Date.now
		}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "HabuTest",
// 	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRj8b4JZdeEDK3ULf-y8Z9OT0Cnsfbpml6qe69JHQMLlfjMnAom&usqp=CAU",
// 	body: "TEST"
// });

app.get("/", function(req, res){
		
	res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
	
	Blog.find({},function(err,blogs){
		if (err){
			console.log("Error");
		}
		else{
			res.render("index",{blogs: blogs});
		}
	});	
});

app.get("/blogs/new", function(req, res){
	res.render("new");	
});

app.post("/blogs", function(req, res){
	// console.log(req.body);
	req.body.blog.body = req.sanitize(req.body.blog.body);
	// console.log(req.body);
	Blog.create(req.body.blog,function(err,newBlog){
		if(err){
			res.render("new");
		}
		else{
			res.redirect("/blogs");
		}
	});
	
});

app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("show", {blog:foundBlog});
		}
	});
});

app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("edit", {blog:foundBlog});
		}
	});	
});

app.put("/blogs/:id", function(req, res){
	// console.log(req.body);
	req.body.blog.body = req.sanitize(req.body.blog.body);
	// console.log(req.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog,function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndDelete(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs");
		}
	});
	
});


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("BlogApp Started!");
});
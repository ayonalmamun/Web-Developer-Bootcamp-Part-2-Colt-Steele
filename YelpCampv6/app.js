var express 		= require ("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require('mongoose'),
	Campground		= require('./models/campground'),
	seedDB			= require('./seeds'),
	Comment			= require('./models/comment'),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	User			= require('./models/user');

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/yelpCamp', {useNewUrlParser: true});
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
seedDB();
app.use(bodyParser.urlencoded({extended: true}));
//passport config
app.use(require("express-session")({
	secret: "Dog bad",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware we will use in every route that will show if we are logged in or not
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});


app.get("/", function(req, res){
		
	res.render("home");
});

//INDEX
app.get("/campgrounds", function(req, res){
	Campground.find({},function(err,allCampgrounds){
		if (err){
			console.log("Error");
		}
		else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
	
});

// CREATE       add new campgrounds to DB
app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampGround = {name : name, image: image, description: desc};
	Campground.create(newCampGround,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	});
	
});

// NEW   show form to create new campground
app.get("/campgrounds/new", function(req, res){
		
	res.render("campgrounds/createNewCamp");
});

//SHOW
app.get("/campgrounds/:id", function(req, res){
	
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{
			console.log(foundCampground);
			res.render("campgrounds/show", {campground:foundCampground});
		}
	});
});

//Comment Route
app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
	Campground.findById(req.params.id,function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/newComments", {campground: campground});
		}
	})
});

app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
	Campground.findById(req.params.id,function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment,function(err, comment){
				if(err){
					console.log(err);
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})
});

//auth routes
//show sign up form
app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		})
	});
});
//login routes
//show login form
app.get("/login", function(req, res){
	res.render("login");
});
//login logic
//passport.authenticate(middleware)
app.post("/login",passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}) ,function(req, res){
});

//logout

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}	
	res.redirect("/login");
};

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("YelpCamp Started!");
});
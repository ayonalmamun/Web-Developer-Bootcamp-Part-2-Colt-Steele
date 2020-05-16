var express 				= require("express"),
	app 					= express(),
	mongoose 				= require("mongoose"),
	passport				= require("passport"),
	bodyParser				= require("body-parser"),
	LocalStrategy			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose"),
	User					= require("./models/user");

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/auth_demo', {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
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

//routes

app.get("/", function(req, res){
	res.render("home");
});

app.get("/secret",isLoggedIn, function(req, res){
	res.render("secret");
});

//auth routes
//show sign up form
app.get("/register", function(req, res){
	res.render("register");
});
//handling user sign up
app.post("/register", function(req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		})
	});
});
//login routes
//render login form
app.get("/login", function(req, res){
	res.render("login");
});
//login logic
//passport.authenticate(middleware)
app.post("/login",passport.authenticate("local",{
	successRedirect: "/secret",
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
	console.log("Started!");
});
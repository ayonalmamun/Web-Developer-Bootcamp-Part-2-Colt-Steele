var express 	= require("express"),
	router 		= express.Router(),
	passport	= require("passport"),
	User		= require('../models/user');

router.get("/", function(req, res){
		
	res.render("home");
});

//auth routes
//show sign up form
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			return res.render("register",{error: err.message});
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		})
	});
});
//login routes
//show login form
router.get("/login", function(req, res){
	res.render("login");
});
//login logic
//passport.authenticate(middleware)
router.post("/login",passport.authenticate("local",{
	successFlash: 'Welcome back to YelpCamp!',
	successRedirect: "/campgrounds",
	failureFlash: true,
	failureRedirect: "/login"
}) ,function(req, res){
});

//logout

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("/");
});

module.exports = router;
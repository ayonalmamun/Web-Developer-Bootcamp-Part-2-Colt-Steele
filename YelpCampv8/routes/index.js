const express  = require("express"),
      User     = require("../models/user"),
      passport = require("passport"),
      router   = express.Router({ mergeParams: true });

router.get("/",function(req,res){
    res.render("landing");
});

//For registering a user
router.get("/register", function(req, res){
    res.render("register");
});

//To create the user
router.post("/register", function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//To Show login form
router.get("/login", function(req, res){
    res.render("login");
});

//To Log in the user
router.post("/login", passport.authenticate("local", { successRedirect: "/campgrounds", failureRedirect: "/login" }), function(req, res){
    
});

//To Log out the user
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

function isUserLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
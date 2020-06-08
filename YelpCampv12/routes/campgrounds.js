var express = require("express");
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');
//INDEX
router.get("/", function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampGround = {name : name, price : price, image: image, description: desc, author: author};
	Campground.create(newCampGround,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			// console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
	
});

// NEW   show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
		
	res.render("campgrounds/createNewCamp");
});

//SHOW
router.get("/:id", function(req, res){
	
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Not found");
			res.redirect("back");
		}
		else{
			// console.log(foundCampground);
			res.render("campgrounds/show", {campground:foundCampground});
		}
	});
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
		Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground:foundCampground});
		});
});
//Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, UpdatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

//delete
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndDelete(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds");
		}
	});
	
});

module.exports = router;

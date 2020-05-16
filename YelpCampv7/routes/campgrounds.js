var express = require("express");
var router = express.Router();
var Campground = require('../models/campground');
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
router.post("/", function(req, res){
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
router.get("/new", function(req, res){
		
	res.render("campgrounds/createNewCamp");
});

//SHOW
router.get("/:id", function(req, res){
	
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

module.exports = router;
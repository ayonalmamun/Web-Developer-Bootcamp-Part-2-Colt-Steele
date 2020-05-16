const express    = require("express"),
      Campground = require("../models/campground"),
      Comment    = require("../models/comment"),
      router     = express.Router({ mergeParams: true });

//Create comment form
router.get("/new", isUserLoggedIn, function(req,res){
    let campId = req.params.id;
    Campground.findById(campId, function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: foundCampground});
        }
    })
})

//Creating comment
router.post("/", isUserLoggedIn, function(req,res){
    let campId = req.params.id;
    let comment = req.body.comment;
    Campground.findById(campId, function(err, foundCampground){
        if(err) {
            console.log(err);
            res.render("/campgrounds");
        } else {
            Comment.create(comment, function(err, addedComment){
                if(err) {
                    console.log(err);
                } else {
                    //Add username and id to comment
                    addedComment.author.id = req.user._id;
                    addedComment.author.username = req.user.username;
                    //save comment
                    addedComment.save();
                    foundCampground.comments.push(addedComment);
                    foundCampground.save();
                    console.log(addedComment);
                    res.redirect("/campgrounds/" + campId)
                }
            })
        }
    })
})

function isUserLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
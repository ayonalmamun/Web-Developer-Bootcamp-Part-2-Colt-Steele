var express 		= require ("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require('mongoose'),
	Campground		= require('./models/campground'),
	seedDB			= require('./seeds'),
	Comment			= require('./models/comment'),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	User			= require('./models/user'),
	methodOverride	= require('method-override')
	flash			= require('connect-flash');

var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 			= require("./routes/index");

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
// mongoose.connect('mongodb://localhost/yelpCamp', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://ayonalmamun:1212@@21@yelpcamp-fwprk.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());
app.set("view engine","ejs");
// seedDB();
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
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("YelpCamp Started!");
});
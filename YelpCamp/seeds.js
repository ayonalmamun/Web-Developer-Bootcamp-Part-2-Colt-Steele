var mongoose 	= require('mongoose'),
	Campground	= require('./models/campground'),
	Comment	= 	  require('./models/comment');

var data = [
	{
		name: "Habu",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRj8b4JZdeEDK3ULf-y8Z9OT0Cnsfbpml6qe69JHQMLlfjMnAom&usqp=CAU",
		description: "Lazy Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia quis magna nec tincidunt. Donec ac ornare augue. Maecenas vel nulla eu mauris dignissim vehicula. Nullam commodo lacus non ligula euismod, et sodales risus imperdiet. Nunc porta tortor sem, vel tempor elit interdum sit amet. Proin tincidunt ligula rutrum odio sagittis, vel posuere justo ullamcorper. Aenean et enim et sapien feugiat maximus non eget nulla. Etiam fringilla euismod blandit. Nulla facilisi."
	},
	{
		name: "Kabila",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ712UXA7cUnv2EvE0QhnMX99U5JR3dpwQUxJ0nwAUDMPM68rmS&usqp=CAU",
		description: "Half bad Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia quis magna nec tincidunt. 					Donec ac ornare augue. Maecenas vel nulla eu mauris dignissim vehicula. Nullam commodo lacus non ligula 					euismod, et sodales risus imperdiet. Nunc porta tortor sem, vel tempor elit interdum sit amet. Proin t						incidunt ligula rutrum odio sagittis, vel 		posuere justo ullamcorper. Aenean et enim et sapien 						feugiat maximus non eget nulla. Etiam fringilla euismod blandit. Nulla 		facilisi."
	},
	{
		name: "Camp",
		image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
		description: "NICE! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia quis magna nec tincidunt. 			Donec ac ornare augue. Maecenas vel nulla eu mauris dignissim vehicula. Nullam commodo lacus non ligula euismod, et 		sodales risus imperdiet. Nunc porta tortor sem, vel tempor elit interdum sit amet. Proin tincidunt ligula rutrum odio 		  sagittis, vel posuere justo ullamcorper. Aenean et enim et sapien feugiat maximus non eget nulla. Etiam fringilla 			euismod blandit. Nulla facilisi."
	}
]

function seedDB(){
	//remove all campgrounds
	Campground.deleteMany({}, function(err){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			console.log("Removed Campgrounds!");
// 			//creating campgrounds
			
// 			data.forEach(function(seed){
// 				Campground.create(seed, function(err, campground){
// 					if (err){
// 						console.log(err);
// 					}else{
// 						console.log("added a campground!")
// 						//adding comments
// 						Comment.create(
// 							{
// 								text: "5/5 NICE!",
// 								author: "Ayon"
// 							},function(err, comment){
// 								if(err){
// 									console.log(err);
// 								}
// 								else{
// 									campground.comments.push(comment);
// 									campground.save();
// 									console.log("Comment Created!");
// 								}
// 							})
// 		}
// 	})
// });
// 		}
	});
}

module.exports = seedDB;


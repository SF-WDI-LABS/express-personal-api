// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var restaurant_data = [
  {
    name: "Eureka",
    type: "American",
    number_of_stars: 4,
    address: "2068 Center St. Berkeley, CA 94704",
    image: "https://s3-media3.fl.yelpcdn.com/bphoto/bgNxOJQ71AxNdh4mhDF4WQ/ls.jpg",
    notes: "Great bar with super beer selection. Awesome on a nice day for people watching"
},
{
  name: "Comal",
  type: "Mexican",
  number_of_stars: 5,
  address: "2020 Shattuck Ave, Berkeley, CA 94704",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWWhClaZtwdukR8lJ0toHx9sX4FR7bOe7YPnPx4H9w8jXuJqwx",
  notes: "Amazing patio, great drinks. Best Mexican in Berkeley."
},
{
  name: "Wood Tavern",
  type: "California, American",
  number_of_stars: 5,
  address: "6317 College Ave Oakland, CA 94618",
  image: "",
  notes: "Favorite Spot"
}
];

db.Restaurant.create(restaurant_data, function(err, restaurant){
   if (err){
     return console.log("Oops, something went wrong.", err);
   }
   console.log("Created new restaurant", restaurant._id)
   process.exit(); // we're all done! Exit the program.
 })

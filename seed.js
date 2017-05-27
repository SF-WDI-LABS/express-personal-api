// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var restaurant_data = [
  {
    name: "Eureka",
    type: "American",
    number_of_stars: 4.2
    address: "2068 Center St., Berkeley, CA 94704"
}
];

Restaurants.create(new_restaurant_data, function(err, restaurant){
   if (err){
     return console.log("Oops, something went wrong.", err);
   }
   console.log("Created new restaurant", restaurant._id)
   process.exit(); // we're all done! Exit the program.
 })

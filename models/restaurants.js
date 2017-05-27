var mongoose  = require("mongoose"),
    Schema    = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: String,
  type: String,
  number_of_stars: Number,
  address: String
});



  

var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;

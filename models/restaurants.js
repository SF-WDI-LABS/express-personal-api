var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
  name: String,
  type: String,
  number_of_stars: Number
  address: String
});





var Restuarants = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;

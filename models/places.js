var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var placeSchema = new Schema({
  name: String,
  description: String,
  image: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Place = mongoose.model("Place", placeSchema);

module.exports = Place;

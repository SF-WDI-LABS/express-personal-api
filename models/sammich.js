var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;

var sammichSchema = new Schema({
  resturantName: String,
  fried: Boolean,
  description: String,
  address: String,
  coordinates: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Sammich = mongoose.model("Sammich", sammichSchema);

module.exports = Sammich;

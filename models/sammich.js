var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;

var sammichSchema = new Schema({
    name: String,
    description: String,
    image: String,
    address: String,
    coordinates: Array,
    created_at: {
    type: Date,
    default: Date.now
  }
});

var Sammich = mongoose.model("Sammich", sammichSchema);

module.exports = Sammich;

var mongoose  = require("mongoose"),
    Schema    = mongoose.Schema;

var ProfileSchema = new Schema({
  name: String,
  email: String,
  dogs: String,
  image: String,
});


var Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;

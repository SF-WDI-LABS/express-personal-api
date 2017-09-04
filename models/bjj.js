// mongodb scheme for database
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var bjjSchema = new Schema({
  gymName: String,
  gymLocation: String,
  image: String,
  reviews: String
});

var Bjj = mongoose.model('Bjj', bjjSchema);

module.exports = Bjj;

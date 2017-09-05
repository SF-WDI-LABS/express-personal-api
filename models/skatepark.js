var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SkatespotSchema = new Schema({
  spotName: String,
  address: String,
  generalDirections: String,
  attributes: [String],
  // img:
});

var Skatespot = mongoose.model('Skatespot', SkatespotSchema);

module.exports = Skatespot;

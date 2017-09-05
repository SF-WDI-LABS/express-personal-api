var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CliffSchema = new Schema({
  name: String,
  nearestCity: String,
  gpsCoords: String,
  height: String,
  acessibility: String,
  description: String
});

var Cliff = mongoose.model('Cliff', CliffSchema);

module.exports = Cliff;

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let mushroomSchema = new Schema({
  commonName: String,
  taxonomy: String,
  dateFound: Date,
  locationFound: String,
  edibility: String,
  certainty: Number,
  photo: String
});

let Mushroom = mongoose.model('Mushroom', mushroomSchema);

module.exports = Mushroom;

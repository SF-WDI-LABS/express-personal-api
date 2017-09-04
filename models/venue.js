var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//This must match what is in the seed file
var VenueSchema = new Schema({
  image: String,
  name: String,
  location: String,
  website: String,
  notes: String,
  imageBackground: String,
});

var Venue = mongoose.model('Venue', VenueSchema);

module.exports = Venue;

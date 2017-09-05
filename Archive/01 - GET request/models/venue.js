var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VenueSchema = new Schema({
  name: String,
  location: String,
  website: String,
  image: String,
  notes: String,
});

var Venue = mongoose.model('Venue', VenueSchema);

module.exports = Venue;

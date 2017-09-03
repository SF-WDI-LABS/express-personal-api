var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VenueSchema = new Schema({
  image: String,
  name: String,
  location: String,
  website: String,
  notes: String,
});

var Venue = mongoose.model('Venue', VenueSchema);

module.exports = Venue;

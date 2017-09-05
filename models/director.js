var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DirectorSchema = new Schema({
  name: String,
  movieTitles: [ String ],
  alive: String,
  countryOfOrigin: String
});

var Director = mongoose.model('Director', DirectorSchema);

module.exports = Director;

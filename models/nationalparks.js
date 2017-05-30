var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var NationalParksSchema = new Schema({
  park: String,
  location: String,
  image: String,
  year_established: String,
});

var NationalPark = mongoose.model('NationalParks', NationalParksSchema);

module.exports = NationalPark;


// var mongoose = require('mongoose'),
//   Schema = mongoose.Schema;

// var CampsiteSchema = new Schema({
//   description: String
// });

// var Campsite = mongoose.model('Campsite', CampsiteSchema);

// module.exports = Campsite;

// var mongoose = require('mongoose'),
// const Schema = mongoose.Schema;

// var CampsiteSchema = new Schema({
//   description: String
// });

// var Campsite = mongoose.model('Campsite', CampsiteSchema);

// module.exports = Campsite;

var mongoose = require('mongoose'),
const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
  make: String,
  model: String,
  image: String,
  releaseDate: String,
  weight: String,
  maxPower: String,
  maxTorque: String,
  engineDisplacement: String
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;

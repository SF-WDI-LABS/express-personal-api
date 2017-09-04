var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  name: String,
  githubUsername: String,
  githubLink: String,
  githubProfileImage: String,
  personalSiteLink: String,
  currentCity: String,
  // hobbies: [
  //   {
  //     hobbyOne: String,
  //     hobbyOneLocation: String,
  //   },
  //   {
  //     hobbyTwo: String,
  //     DestinationOne: String,
  //     DestinationTwo: String,
  //     DestinationThree: String,
  //   }
  // ]
});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;

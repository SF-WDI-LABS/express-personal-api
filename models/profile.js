var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  name: String,
  githubUsername: String,
  githubLink: String,
  githubProfileImage: String,
  personalSiteLink: String,
  currentCity: String,
  hobbies: [{
      hobby: String,
      destOne: String,
      destTwo: String,
      destThree: String,
    }],
});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;

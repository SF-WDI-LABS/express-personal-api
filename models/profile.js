const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name: String,
  userName: String,
  image: String,
  title: String,
  workPlace: String,
  quote: String,
  aboutMe: String,
  socialNetwork: [String],
  skills: [String],
  markedForDeletion: Boolean,
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;

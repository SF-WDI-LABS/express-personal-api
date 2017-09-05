var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Hobby = require('./hobbies');


var PersonalSchema = new Schema({
    name: String,
    githubUsername: String,
    githubLink: String,
    githubProfileImage: String,
    personalSiteLink: String,
    currentCity: String,
    hobbies: [Hobby.schema]
});

var Personal = mongoose.model('Personal', PersonalSchema);

module.exports = Personal;

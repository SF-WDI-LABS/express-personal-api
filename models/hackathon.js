var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var HackathonSchema = new Schema({
  description: String
});

var Hackathon = mongoose.model('Hackathon', HackathonSchema);

module.exports = Hackathon;

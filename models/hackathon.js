const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HackathonSchema = new Schema({
  name: String,
  language: String,
  difficulty: String,
  popularity: Number,
  salary: String,
  photo: String
});

const Hackathon = mongoose.model('hackathon', HackathonSchema);

module.exports = Hackathon;

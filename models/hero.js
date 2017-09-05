var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HeroSchema = new Schema({
  name: String,
  powers: String,
  age: Number,
  secret_identity: String
});

var Hero = mongoose.model('Hero', HeroSchema);

module.exports = Hero;

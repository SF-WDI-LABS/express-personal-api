// var mongoose = require('mongoose'),
//   Schema = mongoose.Schema;

// var CampsiteSchema = new Schema({
//   description: String
// });

// var Campsite = mongoose.model('Campsite', CampsiteSchema);

// module.exports = Campsite;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let BirdSchema = new Schema({
  name: String,
  type: String,
  comments: String,
  urlName: String,
  url: String,
  photo1: String,
  photo2: String,
});

let Bird = mongoose.model('Bird', BirdSchema);

module.exports = Bird;

var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

// module.exports.Campsite = require("./campsite.js.example");

let MushroomSchema = new Schema({
  CommonName: String,
  Taxonomy: String,
  DateFound: Date,
  LocationFound: String,
  Edibility: Boolean,
  Certainty: Number,
  Photo: String
});

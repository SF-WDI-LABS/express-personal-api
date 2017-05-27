var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI || "mongodb://localhost/personal-api");

module.exports.Restaurant = require("./restaurants.js");

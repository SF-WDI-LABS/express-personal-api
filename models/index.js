var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Restaurant = require("./restaurants.js");
module.exports.Profile    = require("./profile.js");

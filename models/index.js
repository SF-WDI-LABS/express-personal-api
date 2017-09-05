var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/dogs", {useMongoClient: true});
mongoose.Promise = global.Promise;  // use native Promise

// module.exports.Campsite = require("./campsite.js.example");


var Shop = require('./shop');

module.exports.Shop = Shop;

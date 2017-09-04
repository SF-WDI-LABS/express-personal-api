// connect to mongodb and mongoose
var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api", {useMongoClient: true});
mongoose.Promise = global.Promise;  // use native Promise

// module.exports.Campsite = require("./campsite.js.example");
var Bjj = require('./bjj');

module.exports.Bjj = Bjj;

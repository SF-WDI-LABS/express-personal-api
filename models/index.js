var mongoose = require("mongoose");
// use native JS promise library instead of Mongoose's deprecated one
mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

// module.exports.Campsite = require("./campsite.js.example");


module.exports.Pie = require("./pies.js")

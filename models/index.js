var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api", {useMongoClient: true});
mongoose.Promise = global.Promise;  // use native Promise

//var promise = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/personal-api", {
//  useMongoClient: true,
//});

// module.exports.Campsite = require("./campsite.js.example");
module.exports.Projects = require("./projects.js");

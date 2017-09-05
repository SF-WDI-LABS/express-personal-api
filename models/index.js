var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api", {useMongoClient: true});
mongoose.Promise = global.Promise;  // use native Promise

module.exports.Personal = require("./personal_data");
module.exports.Hobby = require("./hobbies");
module.exports.Movie = require("./movies");

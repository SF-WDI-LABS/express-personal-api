var mongoose = require("mongoose");


//connect to Mongodb
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/hackathonLanguages");
mongoose.Promise = global.Promise;

module.exports.Hackathon = require("./hackathon.js");

var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Duck = require("./duck.js");
//module.exports.Student = require("./student.js");

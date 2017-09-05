var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HobbySchema = new Schema({
    name: String,
    yearsPlaying: Number
});

var Hobby = mongoose.model('Hobby', HobbySchema);

module.exports = Hobby;
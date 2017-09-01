var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SkateparkSchema = new Schema({
  description: String
});

var Skatepark = mongoose.model('Skatepark', SkateparkSchema);

module.exports = Skatepark;

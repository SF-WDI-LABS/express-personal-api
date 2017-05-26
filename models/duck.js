var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var DuckSchema = new Schema({
  name: String,
  bff: String,
  fav-quote: String,
  age: {
    type: Number,
    default: 1
  }
});

var Duck = mongoose.model('Duck', duckSchema);

module.exports = Duck;

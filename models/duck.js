var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var DuckSchema = new Schema({
  name: String,
  bff: String,
  description: String,
  favQuote: String,
  cohort: {
    type: String,
    default: "WDI38"
  },
  gender: String
});

var Duck = mongoose.model('Duck', DuckSchema);

module.exports = Duck;

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var DuckSchema = new Schema({
  name: String,
  bff: String,
  description: String,
  favQuote: String,
  celebrityDoppleganger: String,
  cohort: {
    type: String,
    default: "WDI38"
  }
});

var Duck = mongoose.model('Duck', DuckSchema);

module.exports = Duck;

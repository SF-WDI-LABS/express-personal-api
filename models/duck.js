var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var DuckSchema = new Schema({
  name: String,
  bff: {
    type: Schema.Types.ObjectId,
    ref: "Student"
  },
  description: String,
  favQuote: String,
  celebrityDoppleganger: String,
});

var Duck = mongoose.model('Duck', DuckSchema);

module.exports = Duck;

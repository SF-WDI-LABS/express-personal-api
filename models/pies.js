var mongoose = require('mongoose');
Schema = mongoose.Schema;

// pies for Bear
var pieSchema = new Schema({
    donor_name: String,
    pie_type: String,
    pie_quantity: Number
});

var Pie = mongoose.model('Pie', pieSchema);
module.exports = Pie;

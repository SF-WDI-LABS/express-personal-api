var mongoose = require('mongoose');
Schema = mongoose.Schema;

// pies for Bear
var pieSchema = new Schema({
    donor_name: String,
    pie_type: String,
    pie_quantity: {
        type: Number,
        default: 1
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});

var Pie = mongoose.model('Pie', pieSchema);
module.exports = Pie;

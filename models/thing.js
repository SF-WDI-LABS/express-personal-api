var mongoose = require('mongoose');

Schema = mongoose.Schema;

var thingSchema = new Schema ({
     name: String,
     description: String
});

var Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;

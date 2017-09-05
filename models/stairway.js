var mongoose = require('mongoose');

Schema = mongoose.Schema;

var stairwaySchema = new Schema ({
     name: String,
     description: String,
     neighborhood: String,
     photoURL: String,
     numSteps: {
       type: Number,
       default: null
     },
     rating: Number,
     difficulty: {
       type: String,
       defaults: "Medium"
     },
     favorite: {
       type: Boolean,
       default: false
     }
});

var Stairway = mongoose.model('Stairway', stairwaySchema);

module.exports = Stairway;

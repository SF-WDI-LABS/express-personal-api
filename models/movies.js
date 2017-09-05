 var mongoose = require('mongoose'),
     Schema = mongoose.Schema;

 var MovieSchema = new Schema({
     title: {
         type: String,
         required: true
     },
     genre: String,
     tomatoMeter: Number,
     haveIseenIt: {
         type: Boolean,
         required: true
     },
     image: String
 });

 var Movie = mongoose.model('Movie', MovieSchema);

 module.exports = Movie;

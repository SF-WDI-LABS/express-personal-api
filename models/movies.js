 var mongoose = require('mongoose'),
     Schema = mongoose.Schema;

 var MovieSchema = new Schema({
     title: String,
     genre: String,
     Tomatometer: Number,
     haveIseenIt: Boolean, 
     image: String
 });

 var Movie = mongoose.model('Movie', MovieSchema);

 module.exports = Movie;

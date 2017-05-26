 var mongoose = require('mongoose'),
     Schema = mongoose.Schema;

 var MovieSchema = new Schema({
     title: String,
     genre: String,
     releaseDate: Date,
     haveIseenIt: Boolean
 });

 var Movie = mongoose.model('Movie', MovieSchema);

 module.exports = Movie;

var db = require("./models");

var reviewsList =[];
reviewsList.push({
              gymName: 'Nine Inch Nails',
              image: 'https://media.merchantcircle.com/29979633/fevereiro-2009%20059_full.jpeg',
              reviews: '1994, March 8',
              gymLocation:"ventura"
            });
reviewsList.push({
              gymName: 'Metallica',
              image: 'Metallica',
              reviews: '1991, August 12',
              gymLocation:"ventua"
            });
reviewsList.push({
              gymName: 'The Prodigy',
              image: 'Music for the Jilted Generation',
              reviews: '1994, July 4',
              gymLocation:"ventua"
            });
reviewsList.push({
              gymName: 'Johnny Cash',
              image: 'https://media.merchantcircle.com/29979633/fevereiro-2009%20059_full.jpeg',
              reviews: '1996, November 5',
             gymLocation:"ventua"
            });




db.Bjj.remove({}, function(err, review){

  db.Bjj.create(reviewsList, function(err, review){
    if (err) { return console.log('ERROR', err); }
    console.log("all reviews:", review);
    console.log("created", review.length, "reviews");
    process.exit();
  });

});








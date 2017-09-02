// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
var db = require("./models");

var movieList =[];
movieList.push({
  directorName: 'RZA',
  title: 'The Man with the Iron Fists',
  yearReleased: '2012',
  genres: [ 'Kung-Fu','Blaxplotation' ]
});
movieList.push({
  directorName: 'Rob Zombie',
  title: 'House of 1000 Corpses',
  yearReleased: '2003',
  genres: [ 'Horror' ]
});
movieList.push({
  directorName: 'Peter Jackson',
  title: 'Bad Taste',
  yearReleased: '1987',
  genres: [ 'Comedy','Horror','Sci-Fi' ]
});
movieList.push({
  directorName: 'Steven Spielberg',
  title: 'E.T. the Extra-Terrestrial',
  yearReleased: '1982',
  genres: [ 'Sci-Fi','Family' ]
});

db.Movie.remove({}, function(err, albums){

  db.Movie.create(movieList, function(err, movies){
    if (err) { return console.log('ERROR', err); }
    console.log("all movies:", movies);
    console.log("created", movies.length, "movies");
    process.exit();
  });

});

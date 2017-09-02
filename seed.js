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

var directorList =[];
directorList.push({
  name: 'RZA',
  movieTitles: ['Man with the iron fists'],
  alive: true,
  countryOfOrigin: 'USA'
});
directorList.push({
  name: 'Peter Jackson',
  movieTitles: ['Bad Taste', 'Lord of The Rings', 'King Kong'],
  alive: true,
  countryOfOrigin: 'New Zealand'
});
directorList.push({
  name: 'Akira Kurosawa',
  movieTitles: ['Yojimbo', 'Seven Samurai', 'Rashomon'],
  alive: false,
  countryOfOrigin: 'Japan'
});
directorList.push({
  name: 'Edgar Write',
  movieTitles: ['Hot Fuzz', 'Shaun of The Dead', 'Baby Driver'],
  alive: true,
  countryOfOrigin: 'UK'
});
db.Director.remove({}, function(err, albums){

  db.Director.create(directorList, function(err, directors){
    if (err) { return console.log('ERROR', err); }
    console.log("all directors:", directors);
    console.log("created", directors.length, "directors");
    process.exit();
  });

});

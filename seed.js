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

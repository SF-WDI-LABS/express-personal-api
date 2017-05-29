// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');


var duckList = [{
  name: "Princess Sadness",
  bff: "Aly",
  description: "While her pretty, pink crown and her accessories say 'it-girl', her eternally down-turned gaze should make clear, there's more to this fancy, feathered, flock-popular girl than meets the eye. She's got a knack for problem solving.",
  favQuote: "You've got a friend in me.",
  celebrityDoppleganger: "Anna Chlumsky",
  cohort: "WDI38",
  gender: "female"
},
{
  name: "Mortimer",
  bff: "Michelle",
  description: "Mortimer loves racquetball. He is rarely seen without his Champion brand cross-trainers and his plastic, protective sports-goggles. When he's not winding-up his backswing on the four-wall court, you can be sure he's not floating around the lazy-pond...Mortimer is an All-Star coach and he gets Team Michelle across the finish line every time!!",
  favQuote: "The ball is in your court, now go score!",
  celebrityDoppleganger: "Chris Kattan",
  cohort: "Many",
  gender: "Male"
},
{
  name: "Orren",
  bff: "Nathan",
  description: "TBD.",
  favQuote: "TBD.",
  celebrityDoppleganger: "Rowan Atkinson",
  cohort: "Many",
  gender: "Male"
}];


// remove all records that match {} -- which means remove ALL records
db.Duck.remove({}, function itsDuckSeason(err, ducks){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log("It's duck season! All ducks removed.")
  }
    // create new records based on the array duckList

    db.Duck.create(duckList, function quackAttack(err, ducks){
      if (err) { return console.log('error: ', err); }
      console.log(`QUACK ATTACK!! Created ", ${ducks.length}  ducks.`);
      process.exit();
    });

});

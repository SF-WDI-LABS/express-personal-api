// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');


var duckList = [{
  name: "Princess Sadness",
  bff: "Aly",
  description: "While her pretty, pink crown and her on-trend wand say 'it-girl', her eternally down-turned gaze should make clear, there's more to this fancy, flock-popular girl than meets the eye. Princess Sadness, or P.S., as most call her, would give all her feathers to keep a friend from getting wet. She's got a knack for problem solving and with her endlessly giving spirit, she makes sure her girl, Aly is never left searching for solutions.",
  favQuote: "You've got a friend in me.",
  cohort: "WDI38",
  gender: "female"
},
{
  name: "Mortimer",
  bff: "Michelle",
  description: "Mortimer loves racquetball. He is rarely seen without his Champion brand cross-trainers and his plastic, protective sports-goggles. When he's not winding-up his backswing on the four-wall court, you can be sure he's not floating around the lazy-pond...Mortimer is an All-Star coach and he gets Team Michelle across the finish line every time!!",
  favQuote: "The ball is in your court, now go score!",
  cohort: "Many",
  gender: "Male"
},
{
  name: "Orren",
  bff: "Nathan",
  description: "Orren's plumage is as dark as the night sky and his eyes are as crystal-blue as the sky but his mysterious and dreamy looks aren't all this dapper drake has going on...his soulful, crooning quack could calm a duckling lost at sea during a category 5 hurricane. Despite his ability to capture any chick's heart with the flick of a feather...Orren doesn't spend much time playing the pond. His focus lies with Nathan...together, they leave no questions unanswered!",
  favQuote: "Mmmmmhmmmm, ::wink:: ",
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

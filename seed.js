// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_duck = {type: "Rubber"}

db.Duck.create(new_duck, function(err, duck){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new duck", duck._id)
  process.exit();
});

var duckList = [{
  name: "Princess Sadness",
  bff: "Aly",
  description: "While her pretty, pink crown and her accessories say 'it-girl', her eternally down-turned gaze should make clear, there's more to this fancy, feathered, flock-popular girl than meets the eye. 'P.S.' as most call her, is emotional and intellectual. She is reliable and loyal.",
  favQuote: "You've got a friend in me.",
  celebrityDoppleganger: "Anna Chlumsky",
  cohort: "WDI38"
}];


// remove all records that match {} -- which means remove ALL records
db.Duck.remove({}, function(err, ducks){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all ducks');

    // create new records based on the array duckList
    db.Duck.create(duckList, function(err, ducks){
      if (err) { return console.log('error: ', err); }
      console.log("created ", ducks.length, " ducks");
      process.exit();
    });
  }
});

// var studentList = [{
//   name: "Aly",
//   cohort: "WDI38"
// },
// {
//   name: "Ryan",
//   cohort: "WDI38"
// },
// {
//   name: "Shridar",
//   cohort: "WDI38"
// },
// {
//   name: "John",
//   cohort: "WDI38"
// },
// {
//   name: "Matt",
//   cohort: "WDI38"
// },
// {
//   name: "Justin",
//   cohort: "WDI38"
// },
// {
//   name: "Bill",
//   cohort: "WDI38"
// },
// {
//   name: "Ibrahim",
//   cohort: "WDI38"
// },
// {
//   name: "Cat",
//   cohort: "WDI38"
// },
// {
//   name: "Younji",
//   cohort: "WDI38"
// },
// {
//   name: "Kabita",
//   cohort: "WDI38"
// },
// {
//   name: "Cindy",
//   cohort: "WDI38"
// },
// {
//   name: "Nuranne",
//   cohort: "WDI38"
// }];

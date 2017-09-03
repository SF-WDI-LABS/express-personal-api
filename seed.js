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
const db = require("./models");

//wipe out everything in the db
db.Bird.remove({}, function(err, birds) {
  if(err)
    console.log(`failed to remove all birds in db: err = ${err}`);
  else
    console.log("successfully wipe out everything in the db");
});

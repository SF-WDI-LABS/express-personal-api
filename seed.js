// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_skatepark = {description: "Sharp rocks. Middle of nowhere."}

db.Skatepark.create(new_skatepark, function(err, skatepark){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new skatepark", skatepark._id)
  process.exit(); // we're all done! Exit the program.
})

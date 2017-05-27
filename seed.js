// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_duck = {type: "Rubber"}

db.Duck.create(new_duck, function(err, duck){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new duck", duck._id)
  process.exit(); // we're all done! Exit the program.
});

// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_place = { name: "Death Valley National Park",
                 description:"In this below-sea-level basin, steady drought and record summer heat make Death Valley a land of extremes. Yet, each extreme has a striking contrast. Towering peaks are frosted with winter snow. Rare rainstorms bring vast fields of wildflowers. Lush oases harbor tiny fish and refuge for wildlife and humans. Despite its morbid name, a great diversity of life survives in Death Valley.",
                  image:"https://npca.s3.amazonaws.com/images/8696/8d5006eb-116e-43ca-8c5f-9b376a78d152-banner.jpg?"}

db.Place.create(new_place, function(err, place){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new place", place._id)
  process.exit(); // we're all done! Exit the program.
})

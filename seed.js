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

let birdSeed = [
  {
  name: "Red Tail Hawk",
  type: "bird of prey",
  comments: "Very common. Often spotted circling search for prey.",
  urlName: "The Cornell Lab of Ornithology",
  url: "https://www.allaboutbirds.org/guide/Red-tailed_Hawk/id",
  photo1: "images/red-tailed-hawk-1827949_960_720.jpg",
  photo2: "images/Red-Tailed Hawk In Flight.jpg",
  },

  {
  name: "Crested Caracara",
  type: "bird of prey",
  comments: "Hard to find one. I saw this only once in South Florida.",
  urlName: "whatbird.com",
  url: "https://identify.whatbird.com/obj/56/overview/Crested_Caracara.aspx",
  photo1: "images/cara.jpg",
  photo2: "images/cara-inflight.jpg",
  },

  {
  name: "Purple Gallinule",
  type: "",
  comments: "Very colorful. In the same family as Coots and Moorhen. An excellent wader.",
  urlName: "Audubon",
  url: "http://www.audubon.org/field-guide/bird/purple-gallinule",
  photo1: "images/gallinule2.jpg",
  photo2: "images/gallinule.jpg",
},
];

//wipe out everything in the db
db.Bird.remove({}, function(err, birds) {
  if (err) {
    console.log(`failed to remove all birds in db: err = ${err}`);
    return;
  }

  console.log("successfully wiped out everything in the db");

  db.Bird.create(birdSeed, function(err, birds) {
    if (err) {
      console.log(`failed to create birdSeed: err = ${err}`);
      return;
    }

    console.log("successfully created birdSeed");
  });
});

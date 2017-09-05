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
  comments: "Very common. Often spotted circling search for prey. The field marks are the dark red color of the tail features, that's what all the books say. But for me, the dead give away is the dark band between shoulder and wrist seen in flight (as shown in the photo).",
  urlName: "The Cornell Lab of Ornithology",
  url: "https://www.allaboutbirds.org/guide/Red-tailed_Hawk/id",
  // photo1: "images/red-tailed-hawk-1827949_960_720.jpg",
  // photo2: "images/Red-Tailed Hawk In Flight.jpg",
  photo1: "images/redtail-2.jpg",
  photo2: "images/redtail-inflight-2.jpg"
  },

  {
  name: "Crested Caracara",
  type: "bird of prey",
  comments: "Hard to find this majestic looking bird. I saw this only once in South Florida while driving in a back road.",
  urlName: "whatbird.com",
  url: "https://identify.whatbird.com/obj/56/overview/Crested_Caracara.aspx",
  photo1: "images/cara.jpg",
  photo2: "images/cara-inflight.jpg",
  },

  {
  name: "Purple Gallinule",
  type: "warm water marsh bird",
  comments: "Very colorful. In the same family as Coots and Moorhen. An excellent wader.",
  urlName: "Audubon",
  url: "http://www.audubon.org/field-guide/bird/purple-gallinule",
  photo1: "images/gallinule3.jpg",
  photo2: "images/gallinule4.jpg",
},

  {
  name: "Snail Kite",
  type: "bird of prey",
  comments: "Snail is their only food source. Notice the curving beak for pulling out the snail from its shell. Resident of Florida only.",
  urlName: "Audubon",
  url: "http://fl.audubon.org/birds/everglade-snail-kite",
  photo1: "images/snail-kite.jpg",
  photo2: "images/snail-kite-2.jpg",
  },

  {
  name: "Anhinga",
  type: "water bird",
  comments: "Tropical bird found in the southern swamps. They hunt by spear fishing. They have no fatty glands to repel water from their features so are often seen spreading their wings to dry out the features.",
  urlName: "Animal Diversity Web",
  url: "http://animaldiversity.org/accounts/Anhinga_anhinga/",
  photo1: "images/anhinga.jpeg",
  photo2: "images/anhinga2.jpg",
  },

  {
  name: "Roseate Spoonbill",
  type: "water bird",
  comments: "These pretty birds feed in flocks around Gulf of Mexico and the Southwest. They swing their spoon-shaped bill back and forth in the water to catch small fish, crustaceans, and invertebrates.",
  urlName: "Nature Works",
  url: "http://www.nhptv.org/natureworks/roseatespoonbill.htm",
  photo1: "images/spoonbill4.jpg",
  photo2: "images/spoonbill3.jpg",
  },

  {
  name: "Swallow-Tailed Kite",
  type: "bird of prey",
  comments: "Deeplyforked tail limited to Florida and surrounging area. I once saw a group of three flying over my head in the West Coast of Florida forrest. They rarely flapped their wings and flew by so gracefully.",
  urlName: "Nature Works",
  url: "https://abcbirds.org/bird/swallow-tailed-kite/",
  photo1: "images/swallow-tailed-kite.jpg",
  photo2: "images/swallow-tailed.jpg",
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

  process.exit();  //so it does not hang there
});

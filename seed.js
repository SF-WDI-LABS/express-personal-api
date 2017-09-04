// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}
let superHero = [
  {
    name: "Spider-Man",
    powers: "Spider Things",
    age: 23,
    secret_identity: true
  },
  {
    name: "Batman",
    powers: "Unbreakable Will",
    age: 32,
    secret_identity: true
  },
  {
    name: "Thor",
    powers: "Thunder God abilities",
    age: 1500,
    secret_identity: false
  }
]

superHero.forEach(function(new_hero){
  db.Hero.create(new_hero, function(err, hero){
    if(err){
      return console.log("Error:", err)
    }
    console.log("Created new hero ", hero.name)
  })
})

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

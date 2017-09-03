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
// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var gamelist =[];
gamelist.push({
              title: 'Settlers of Catan',
              description: 'The Settlers of Catan from Mayfair Games is an award-winning strategy game where players collect resources and use them to build roads, settlements and cities on their way to victory. The board itself is variable, making each game a little different from the next.',
              playtime: '1 hour',
              players: '3+',
              image: 'images/catanpic.png'
            });
gamelist.push({
              title: 'Monopoly',
              description: 'placeholder',
              playtime: 'too long',
              players: '2-4',
              image: 'images/generic-game-image.jpg',
            });
gamelist.push({
              title: 'Sorry',
              description: 'placeholder',
              playtime: '30 minutes',
              players: '2-4',
              image: 'images/generic-game-image.jpg',
            });




db.Boardgame.remove({}, function(err, games){

  db.Boardgame.create(gamelist, function(err, games){
    if (err) { return console.log('ERROR', err); }
    console.log("all games:", games);
    console.log("created", games.length, "games");
    process.exit();
  });

});

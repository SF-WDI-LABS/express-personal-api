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
              playtime: '1 Hour',
              players: '3+',
              image: 'images/catanpic.png'
            });
gamelist.push({
              title: 'Carcassonne',
              description: 'A turn based strategy game in which you draw tiles to build a map and claim feature of the landscape for points.',
              playtime: '1 Hour',
              players: '2+',
              image: 'images/Carcassonne.jpg',
            });
gamelist.push({
              title: 'Betrayal at House on the Hill',
              description: 'Players all begin as allies exploring a haunted house filled with dangers, traps, items and omens. As players explore the mansion, new room tiles are chosen at random; accordingly, the game board is different each session. Eventually the "haunt" begins, with the nature and plot of the current ghost story revealed; one player usually "betrays" the others and takes the side of the ghosts, monsters, or other enemies, while the remaining players collaborate to defeat them. ',
              playtime: '45 - 90 Minutes',
              players: '3-6',
              image: 'images/Betrayal.jpg',
            });




db.Boardgame.remove({}, function(err, games){

  db.Boardgame.create(gamelist, function(err, games){
    if (err) { return console.log('ERROR', err); }
    console.log("all games:", games);
    console.log("created", games.length, "games");
    process.exit();
  });

});

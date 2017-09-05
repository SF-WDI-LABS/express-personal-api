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

var db = require("./models");

var motorcycleList = [];

motorcycleList.push({
              make: 'BMW',
              model: 'S1000RR',
              releaseDate: '2009 to current',
              weight: '403 lbs',
              maxPower: '199 hp at 13,500 rpm'
              maxTorque: '83 lb.-ft. at 10,500 rpm'
              engineDisplacement: '999 cc'
});
motorcycleList.push({
              make: 'Honda',
              model: 'CBR1000RR',
              releaseDate: '2008 to current',
              weight: '439 lbs',
              maxPower: '153.4 hp at 10,700 rpm'
              maxTorque: '78.74 lb.-ft. at 9,400 rpm'
              engineDisplacement: '999 cc'
});
motorcycleList.push({
              make: 'BMW',
              model: 'S1000RR',
              releaseDate: '2009 to current',
              weight: '403 lbs',
              maxPower: '199 hp at 13,500 rpm'
              maxTorque: '83 lb.-ft. at 10,500 rpm'
              engineDisplacement: '999 cc'
});
motorcycleList.push({
              make: 'BMW',
              model: 'S1000RR',
              releaseDate: '2009 to current',
              weight: '403 lbs',
              maxPower: '199 hp at 13,500 rpm'
              maxTorque: '83 lb.-ft. at 10,500 rpm'
              engineDisplacement: '999 cc'
});


// db.Motorcycle.create(motorcycleList, function(err, motorcycles){
//   if (err){
//     return console.log("Error:", err);
//   }
//
//   console.log("Added new motorcycle", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

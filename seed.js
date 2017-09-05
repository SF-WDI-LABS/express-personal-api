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
              image: '/images/s1000rr.jpg',
              releaseDate: '2009 to current',
              weight: '403 lbs',
              maxPower: '199 hp at 13,500 rpm'
              maxTorque: '83 lb.-ft. at 10,500 rpm'
              engineDisplacement: '999 cc'
});
motorcycleList.push({
              make: 'Honda',
              model: 'CBR1000RR',
              image: '/images/cbr1000rr.jpg',
              releaseDate: '2008 to current',
              weight: '439 lbs',
              maxPower: '153.4 hp at 10,700 rpm'
              maxTorque: '78.74 lb.-ft. at 9,400 rpm'
              engineDisplacement: '999 cc'
});
motorcycleList.push({
              make: 'Triumph',
              model: 'Daytona 675R',
              image: '/images/675r.jpg',
              releaseDate: '2006 to current',
              weight: '363 lbs',
              maxPower: '104 hp at 13,500 rpm'
              maxTorque: '53 lb.-ft. at 10,500 rpm'
              engineDisplacement: '674 cc'
});
motorcycleList.push({
              make: 'Suzuki',
              model: 'GSX-R 750',
              image: '/images/gsxr750.jpg',
              releaseDate: '2011 to current',
              weight: '418 lbs',
              maxPower: '148 hp at 12,800 rpm'
              maxTorque: '64 lb.-ft. at 11,200 rpm'
              engineDisplacement: '749 cc'
});



db.motorcycles.remove({}, function(err, allExistingMotorcycles){

  db.motorcycle.create(profileList, function(err, profiles) {
    if (err) {
      return console.log('ERROR during seeding', err);
    }
    console.log("all profiles created:", profiles);
    console.log("created", profiles.length, "profiles");
    process.exit();
  });

});

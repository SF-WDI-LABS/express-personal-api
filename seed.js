var db = require('./models');

var nationalparks_list = [
  {
    park: "Death Valley"
    location: "California"
    image: "http://i.imgur.com/aNW2rb6.jpg"
    year_established: "1994"
  },
  {
    park: "Yosemite"
    location: "California"
    image: "http://i.imgur.com/3gIl6Eo.jpg"
    year_established: "1890"
  },
  {
    park: "Zion"
    location: "Utah"
    image: "http://i.imgur.com/5toZrZM.jpg"
    year_established: "1919"
  }
];

db.Park.remove({}, function(err, parks){
  if(err) {
    console.log('Error occured in removing park', err);
  } else {
    console.log('removed all parks');


    db.Park.create(nationalparks_list, function(err, parks){
      if (err) { return console.log('err', err); }
      console.log("created new national park", park._id);
      process.exit();
    });
  }
});


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

// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })


var dogShop =[];

dogShop.push({
              shopName: 'dogs R Us',
              careTakerType: 'GROOMER',
              address: '1234 jank drive ',
              phoneNumber: [ '281-330-8004' ], 
              website: ['www.checkmeOut.com'],
              image: '../images/gshop.jpg',
            });
dogShop.push({
              shopName: 'dogs 4 you',
              careTakerType: 'Breeder',
              address: '3456 chillout drive',
              phoneNumber: [ '281-330-8004' ], 
              website: ['www.checkOnMe.com'],
              image: '../images/dbreeders.jpeg',
            });
dogShop.push({
              shopName: 'My Dogz',
              careTakerType: 'Breeder',
              address: '777 The Homies lane',
              phoneNumber: [ '414-444-4444' ], 
              website: ['doggyduties.com'],
              image: '../images/ddaycare.jpg',
            });
dogShop.push({
              shopName: 'PAWS PLEASE',
              careTakerType: 'Groomer',
              address: '3487 Nth GA drive',
              phoneNumber: [ '925-949-7278' ], 
              website: ['www.Pawsplease.com'],
              image: '../images/adba.jpg',
            });





db.Shop.remove({}, function(err, shops){

  db.Shop.create(dogShop, function(err, shops){
    if (err) { return console.log('ERROR', err); }
    console.log("all shops:", shops);
    console.log("created", shops.length, "shops");
    process.exit();
  });

});
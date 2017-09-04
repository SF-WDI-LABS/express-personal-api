// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var LA_trip = [
    {
    name: "Adorable Baseball Dudes",
    link: "/images/LA_trip/baseball_dudes.jpg",
    description: "These are some adorable toys I saw at one the LA stores"
    },{
    name: "Delicious Dessert!",
    link: "/images/LA_trip/casino_dessert.jpg",
    description: "Some awesome dessert I had at Morongo Casino Resort"

    },{
    name: "Chinese Theatre",
    link: "/images/LA_trip/chinese_theatre.jpg",
    description: "One of the popular lankmarks at the Hollywood Boulevard, Los Angeles"
    }, {
    name: "Macaroon",
    link: "/images/LA_trip/macaroon.jpg",
    description: "What can I say? They are some soft little sweet treat!"
    }, {
    name: "Oscar EVERYWHERE!",
    link: "/images/LA_trip/oscar.jpg",
    description: "Oscars I have earned in my life haha. (Not)"
    }
  ];

db.Story.remove({}, function(err, stories){
	db.Story.create(LA_trip, function(err, new_Story){
	  if (err){
	    return console.log("Error:", err);
	  }
	  console.log("Created new stories", new_Story);
	  process.exit(); // we're all done! Exit the program.
	});
});


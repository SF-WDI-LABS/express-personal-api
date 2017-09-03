// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

 var venueList = [];
 venueList.push({
        name: "Oxford Social Club",
        location: "San Diego",
        website: "https://theoxfordsd.com/",
        image: "https://pbs.twimg.com/profile_images/745999186265399296/AgQFU1QA.jpg",
        notes: "Be Sophisticated or Don't",
      });
venueList.push({
        name: "The Bungalow",
        location: "Santa Monica",
        website: "http://www.thebungalow.com/",
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/F-f7YjOFDd9b5jKVmkE84Q/ls.jpg",
        notes: "Breezy, beachside Baja lifestyle",
      });
venueList.push({
        name: "The Battery",
        location: "San Francisco",
        website: "https://www.thebatterysf.com/club/",
        image: "https://qph.ec.quoracdn.net/main-thumb-t-453945-200-wcuvopxyeusrfhqagrthqdwyvviwbgol.jpeg",
        notes: "Diversity and intelligence with just a touch of the bizarre",
      });

      db.Venue.remove({}, function(err, venues){

        db.Venue.create(venueList, function(err, venues){
          if (err) { return console.log('ERROR', err); }
          console.log("all venues:", venues);
          console.log("created", venues.length, "venues");
          process.exit();// we're all done! Exit the program.
        });

      });

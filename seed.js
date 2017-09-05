// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

//Step 1, 1 of 2: This sets up your API
 var venueList = [];
 venueList.push({
        name: "Oxford Social Club",
        location: "San Diego",
        website: "https://theoxfordsd.com/",
        image: "https://pbs.twimg.com/profile_images/745999186265399296/AgQFU1QA.jpg",
        notes: "Be Sophisticated or Don't",
        imageBackground: "https://www.sandiego.com/sites/sandiego.com/files/styles/large/public/content/featured-content/sd-tour-1.jpg?itok=8KDQcQ5u",
      });
venueList.push({
        name: "The Bungalow",
        location: "Santa Monica",
        website: "http://www.thebungalow.com/",
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/F-f7YjOFDd9b5jKVmkE84Q/ls.jpg",
        notes: "Breezy, beachside Baja lifestyle",
        imageBackground: "https://santamonicaflyers.com/wp-content/themes/atec/images/home-section02.jpg",
      });
venueList.push({
        name: "The Battery",
        location: "San Francisco",
        website: "https://www.thebatterysf.com/club/",
        image: "https://qph.ec.quoracdn.net/main-thumb-t-453945-200-wcuvopxyeusrfhqagrthqdwyvviwbgol.jpeg",
        notes: "Diversity and intelligence with just a touch of the bizarre",
        imageBackground: "https://www.homeadvisor.com/images/consumer/hhi/hero-photos/city/SanFrancisco.jpg",
      });
      // venueList.push({
      //         name: "Soho House",
      //         location: "West Hollywood",
      //         website: "https://www.sohohousewh.com/",
      //         image: "https://i.pinimg.com/736x/91/b5/d6/91b5d604798a1fee3b4cf0f433bbf45e--soho-house-west-hollywood.jpg",
      //         notes: "Assemble communities with creative souls",
      //         imageBackground: "http://wolfliketheanimal.com/wp-content/uploads/2013/06/12.jpg",
      //       });

      //Step 1, 2 of 2
        //Next step, go to server.js file to set up requests
      db.Venue.remove({}, function(err, venues){
        db.Venue.create(venueList, function(err, venues){
          if (err) { return console.log('ERROR', err); }
          console.log("all venues:", venues);
          console.log("created", venues.length, "venues");
          process.exit();// we're all done! Exit the program.
        });
      });

      var profileList = [];
      profileList.push({
         name: "Carlynn Espinoza",
         githubUsername: "Carlynn",
         githubLink: "https://github.com/Carlynn",
         githubProfileImage: "https://avatars1.githubusercontent.com/u/29782639?v=4&s=460",
         personalSiteLink: "https://carlynn.github.io/",
         currentCity: "San Francisco",
         hobbies: [{
           hobby: 'Travel',
            destOne: 'Mexico City',
            destTwo: 'Thailand',
            destThree: "Africa",
          }, {
            hobby: 'Snowboarding',
            destOne: 'Tahoe',
            destTwo: 'Whistler',
            destThree: 'Vail',
          }]
       });

       db.Profile.remove({}, function(err, profiles){
         db.Profile.create(profileList, function(err, profiles){
           if (err) { return console.log('ERROR', err); }
           console.log("complete profile:", profiles);
           console.log("created", profiles.length, "profile");
           process.exit();// we're all done! Exit the program.
         });
       });

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

let movie_listings = [
    {
        title: 'Logan',
        genre: ['Action &amp; Adventure', 'Drama', 'Science &amp; Fiction', 'Fantasy'],
        tomatoMeter: 92,
        haveIseenIt: false, 
        image: 'https://resizing.flixster.com/0E6Et1Fi6wFzN9PFWdZdyIl2H_c=/206x305/v1.bTsxMjMwNDQ4NDtqOzE3MzMyOzEyMDA7NjI2OzkyNA'
    },
    {
        title: 'Norman',
        genre: ['Drama'],
        tomatoMeter: 87,
        haveIseenIt: false, 
        image: 'https://resizing.flixster.com/M-EHPEAHIOeIpBniHySCXPPlIac=/206x305/v1.bTsxMjM1MDczMDtqOzE3MzMyOzEyMDA7ODEyNzsxMjA0MA'
    },
    {
        title: 'The Lego Batman Movie',
        genre: ['Action & Adventure', 'Animation', 'Comedy', 'Kids &amp; Family'],
        tomatoMeter: 90,
        haveIseenIt: false,
        image: 'https://resizing.flixster.com/5e1sqBSS4Yjl16MU2CK4QtFrTA8=/206x305/v1.bTsxMjI3NjU0NTtqOzE3MzMyOzEyMDA7NDA1MDs2MDAw'
    },
    {
        title: 'My Life as a Zucchini',
        genre: ['Animation', 'Art House &amp; International', 'Kids &amp; Family'],
        tomatoMeter: 100,
        haveIseenIt: false,
        image: 'https://resizing.flixster.com/8Y1vg4k4vnncA05-gKZRrb3E3-o=/206x305/v1.bTsxMjMxMDIwNDtqOzE3MzMyOzEyMDA7MzY4OzUzOA'
    },
    {
        title: 'Berlin Syndrome',
        genre: ['Art House &amp; International', 'Drama', 'Mystery &amp; Suspense'],
        tomatoMeter: 76,
        haveIseenIt: false,
        image: 'https://resizing.flixster.com/wx-IBk9diQ5EMelmhnDSaPNDB-4=/206x305/v1.bTsxMjQwMTA0NTtqOzE3MzMzOzEyMDA7NjM5Ozk0Ng'
    }
]

// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
//app will talk to server which will talk to seed.js
var db = require('./models');
var personalData = [];

personalData.push({name: 'David Jue'});
personalData.push({githubUsername: 'Congocash'});
personalData.push({githubLink: 'https://github.com/CongoCash'});
personalData.push({githubProfileImage: '../public/images/github-image.png'});
personalData.push({personalSiteLink: 'https://peaceful-chamber-97994.herokuapp.com/'});
personalData.push({currentCity: 'San Francisco'});
personalData.push({
    hobbies: [
        {
            name: 'Basketball',
            yearsPlaying: 13,
        },
        {
            name: 'Tetris',
            yearsPlaying: 5
        },
        ]
})




db.Personal.create(personalData, function(err, data){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new campsite", data._id)
  process.exit(); // we're all done! Exit the program.
})

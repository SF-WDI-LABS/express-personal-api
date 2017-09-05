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

let modelList = [];
modelList.push({
	name: 'Battleship',
	description: 'I created the game Battleship using Javascript',
	githubRepoUrl: "examplelink.com",
	deployedUr: 'otherexanple.com',
	screenshot: 'fake.jpeg'
});
modelList.push({
	name: 'Personal portfolio',
	description: 'I created the game Battleship using Javascript',
	githubRepoUrl: "examplelink.com",
	deployedUr: 'otherexanple.com',
	screenshot: 'fake.jpeg'
});
modelList.push({
	name: 'Personal Api',
	description: 'I created the game Battleship using Javascript',
	githubRepoUrl: "examplelink.com",
	deployedUr: 'otherexanple.com',
	screenshot: 'fake.jpeg'
});

db.Project.remove({}, function(err, projects){
	db.Project.create(modelList, function (err, projects){
		process.exit();
	});
})
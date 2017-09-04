// removeSeed.js

var db = require('./models');

db.Story.remove({}, function(err, stories){
	if (err){
		return console.log("Error:", err);
	}
	console.log("Deleted all stories" + stories);
		  process.exit(); // we're all done! Exit the program.
});
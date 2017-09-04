// storyController


var db = require('../models');

// Retreat all data from db and send them whole db as JSON
// So front end can render via jQuery
function index(req, res){
	db.Story.find({},function(err, stories){
		if(err) {console.log(err); return}
		res.json(stories);
	});
}

function create(req, res){

	var story = new db.Story({
		name: req.body.story_title,
		description: req.body.story_description,
		link: req.body.story_link,
	});
	story.save(function(err,stored_story){
		res.json(stored_story);
		console.log(stored_story);
	});
	
}

function show(req, res){

}

function destroy(req, res){
	db.Story.findByIdAndRemove(req.params.story_id, function(err,story){
		res.status(200).send("Success!");
	});

}

function update(req, res){

}


module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
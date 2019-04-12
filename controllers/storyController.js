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

// Create new story based on form input
function create(req, res){
	var story = new db.Story({
		name: req.body.form_title,
		description: req.body.form_description,
		link: req.body.form_link,
	});
	story.save(function(err,stored_story){
		res.json(stored_story);
	});
}

// Find a story by id and send it back as JSON
function show(req, res){
	db.Story.findById(req.params.story_id, function(err, story) {
	  if(err) { console.log(err); }
	  res.json(story);
	});
}

// Destroy db record based on ID
function destroy(req, res){
	db.Story.findByIdAndRemove(req.params.story_id, function(err,story){
		res.status(200).send("Success!");
	});
}

// Update existing record based on ID and
// using input fields
function update(req, res){
	db.Story.findById(req.params.story_id, function(err, story){
		story.name = req.body.name;
		story.description = req.body.description;
		story.save(function(err, new_story){
			res.json(new_story);
		});
	});
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
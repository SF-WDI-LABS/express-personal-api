var db = require('../models');


function index(req, res){
	db.Project.find({}, function(err, allProjects) {
		if (err)
			console.log(err);
    res.json(allProjects);
  });
}

function create(req, res){
	db.Project.create(req.body, function(err, project) {
    if (err) { console.log('error', err); }
    res.json(project);
  });
}

function show(req, res){
	db.Project.findById(req.params.id, function(err, project){
		res.json(project);
	});
}

function destroy(req, res){
	db.Project.findByIdAndRemove(req.params.id, function(err, project){
		res.json(project);
	});
}

function update(req, res){
	db.Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, project){
		res.json(project);
	});
}





module.exports = {
    index: index,
    create: create,
    show: show,
    destroy: destroy,
    update: update
};
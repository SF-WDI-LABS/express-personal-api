
var db = require('../models');

function index(req, res) {
 
  db.Bjj.find({}, function(err, allAlbums) {
    res.json(allAlbums);
  });
}


// create function to create data in database
function create(req, res) {
  console.log('body', req.body);


  db.Bjj.create(req.body, function(err, reviews) {
  	console.log(reviews);
    if (err) { console.log('error', err); }
    console.log(reviews);
    res.json(reviews);
  });
}


// get data input by id
function show(req, res) {
  // find one gym by id and send it back as JSON
  console.log(req.params.bjjId);
  db.Bjj.findById(req.params.bjjId, function(err, foundAlbum) {
  	
    if(err) { console.log('albumsController.show error', err); }
    console.log('albumsController.show responding with', foundAlbum);
    res.json(foundAlbum);
  });
}






module.exports = {
  index: index,
  create: create,
  show: show
 
}

var db = require('../models');

function index(req, res) {
  // send back all albums as JSON
  db.Bjj.find({}, function(err, allAlbums) {
    res.json(allAlbums);
  });
}


// POST /api/albums
function create(req, res) {
  // create an album based on request body and send it back as JSON
  console.log('body', req.body);

  // split at comma and remove and trailing space
  // var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  // req.body.genres = genres;

  db.Bjj.create(req.body, function(err, reviews) {
  	console.log(reviews);
    if (err) { console.log('error', err); }
    console.log(reviews);
    res.json(reviews);
  });
}


// GET /api/albums/:albumId
function show(req, res) {
  // find one album by id and send it back as JSON
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
var db = require('../models');


// GET /director
function index(req, res) {
  // send back all directors as JSON
  db.Director.find({},function(err, allDirectors){
    res.json(allDirectors)
  })

}

// POST /director
function create(req, res) {
  // create a director based on request body and send it back as JSON
  console.log('body', req.body);

  // split at comma and remove and trailing space
  var movieTitles = req.body.movieTitles.split(',').map(function(item) { return item.trim(); } );
  req.body.movieTitles = movieTitles;


  db.Director.create(req.body, function(err, director) {
    if (err) { console.log('error', err); }
    console.log(director);
    res.json(director);
  });
}

// GET /director/:id
function show(req, res) {
  // find one director by id and send it back as JSON
  db.Director.findById(req.params._id, function(err, foundDirector){
    if(err){console.log('there has been an error:', err);}
    res.json(foundDirector);
  })
}

// DELETE /director/:id
function destroy(req, res) {
  // find one director by id, delete it, and send it back as JSON
  db.Director.findByIdAndRemove(req.params._id, function(err, director){
    console.log('deleting', director)
  })
}

// PUT or PATCH /director/:id
function update(req, res) {
  // find one director by id, update it based on request body,
  // and send it back as JSON
  console.log(req.body)
  db.Director.findById(req.params._id,  function(err, foundDirector) {

    if(err) { console.log(err); }

    foundDirector.name = req.body.name || foundDirector.name;
    foundDirector.alive = req.body.alive || foundDirector.alive;
    foundDirector.countryOfOrigin = req.body.countryOfOrigin || foundDirector.countryOfOrigin;
    foundDirector.movieTitles = req.body.movieTitles || foundDirector.movieTitles;
    foundDirector.save(function(err, saveDirector) {
        if (err) { console.log(err); }
        res.json(saveDirector);
      });
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update,
}

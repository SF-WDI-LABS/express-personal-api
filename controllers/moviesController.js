/************
 * DATABASE *
 ************/
//change everything here into movies
var db = require('../models');

// GET /api/albums
function index(req, res) {
    // send back all albums as JSON
    db.Movie.find({}, function(err, allMovies) {
        res.json(allMovies);
        // console.log(allMovies);
    });
}

// POST /api/albums
function create(req, res) {
    // create an album based on request body and send it back as JSON
    console.log('body', req.body);
    db.Movie.create(req.body)
        // if (err) { console.log('error', err); }
        console.log("hello");
        res.json(req.body);
}

function destroy(req, res) {
    db.Movie.findOneAndRemove({_id: req.params.movieid}, function(err, remainingMovies) {
    })
}

function update(req, res) {
    console.log(req.body);
    db.Movie.findByIdAndUpdate(req.params.movieid, {new: true}, (err, movie) => {
        movie.title = req.body.title;
        movie.director= req.body.director;
        movie.year= req.body.year;
        movie.image = req.body.image
        movie.save();
    })
    console.log('testing');
}

// export public methods here
module.exports = {
    index: index,
    create: create,
    // show: show,
    destroy: destroy,
    update: update
};
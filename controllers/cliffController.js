let db = require('../models');
// controllers/albumsController.js
// GET /api/albums
function index(req, res) {
  // send back all albums as JSON
  db.Cliff.find(function(err, albums){
    if (err) {
      console.log("index error" + err);
      res.sendStatus(500);
    }
    res.send(albums);
  });
}

// POST /api/albums
function create(req, res) {
  //create album using form data from req parameter
  var newAlbum = new db.Album({
    artistName: req.body.artistName,
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    genres: req.body.genres.split(","),
    songs: []
  });
  // add that album to the database
newAlbum.save(function(err, album){
  if (err) {
    return console.log("create error: " + err);
  }
  console.log("created", album.name);
  res.json(album);
});


}

// GET /api/albums/:albumId
function retrieve(req, res) {
  // find one album by id and send it back as JSON
}

// DELETE /api/albums/:albumId
function destroy(req, res, id) {
  // find one album by id, delete it, and send it back as JSON
}

// PUT or PATCH /api/albums/:albumId
function update(req, res) {
  // find one album by id, update it based on request body,
  // and send it back as JSON
}

module.exports = {
  index: index,
  create: create,
  retrieve: retrieve,
  destroy: destroy,
  update: update
};

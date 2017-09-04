// // GET /api/albums
// function index(req, res) {
//     // send back all albums as JSON
//     db.Album.find({}, function(err, allAlbums) {
//         res.json(allAlbums);
//     });
// }


//need to connect index function to display data from seed, start with ajax in app.js

module.exports = {
    movies: require('./moviesController'),
}

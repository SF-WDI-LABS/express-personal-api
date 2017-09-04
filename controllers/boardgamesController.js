

var db = require('../models');


// function for initial page render
function index (req, res) {
  // console.log('Reached index controller');
  db.Boardgame.find({}, function (err, allGames) {
    if (err) {
      console.log('error from controller index', err);
    }
    res.json(allGames);
  })
}

// Creates new board game
function create (req, res) {
  console.log('Reached create controller', req.body);
  db.Boardgame.create(req.body, function(err, game) {
    if (err) {
      console.log('ERROR from controller create', err);
    }
    res.json(game)
  })
}

//Displays game to edit
function edit (req, res) {
  console.log('Reached edit controller', req.body);

}






module.exports = {
  index: index,
  create: create,
  edit: edit,
}

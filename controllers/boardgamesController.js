

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
    if (game.image) {
      res.json(game);
    } else {
      game.image = 'images/generic-game-image.jpg';
      game.save(function(err, newGame) {
        if (err) {
          console.log("ERROR from update controller", err);
        }
        res.json(newGame)
      })
    }
  })
}


// Updates edited game
function update (req, res) {
  console.log('reached update', req.body);
  db.Boardgame.findById(req.params.id, function(err, foundGame) {
    foundGame.title = req.body.title,
    foundGame.description = req.body.description,
    foundGame.playtime = req.body.playtime,
    foundGame.players = req.body.players,
    foundGame.save(function(err, savedGame) {
      if (err) {
        console.log("ERROR from update controller", err);
      }
      res.json(savedGame)
    })
  })
}

function destroy (req, res) {
  console.log("destroy controller reached");
  db.Boardgame.findByIdAndRemove(req.params.id, function(err, deletedGame) {
    if (err) {
      console.log(err);
    } else {
    res.json(deletedGame);
    }
  })
}


module.exports = {
  index: index,
  create: create,
  update: update,
  destroy: destroy,
}

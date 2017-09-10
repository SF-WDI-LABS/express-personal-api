//DB
const db = require("../models");

//GET /api/birds -- get all birds
function index(req, res) {
  db.Bird.find({}, function(err, allBirds) {
    if (err) {
      console.log("Failed /api/birds ");
      return;
    }
    res.json(allBirds);
  })
}

//POST /api/birds -- adding a bird
function create(req, res) {
  db.Bird.create(req.body, function(err, bird) {
    console.log('entering db.Bird.create()');
    if (err) {
      console.log(`create bird failed: err =${err}`);
      return;
    }
    console.log("create bird success");
    res.json(bird);
  });
}

function update(req, res) {
  db.Bird.findById(req.params.birdId, function(err, bird){
    if (err) {
      console.log(`Did not find bird id: ${req.params.birdId} in db`);
      return;
    }

    bird.name = req.body.name;
    bird.type = req.body.type;
    bird.comments = req.body.comments;

    bird.save(function(err, bird) {
      if (err) {
        console.log(`Failed to update bird id: ${bird._id} in db`);
        return;
      }

      res.json(bird);
    });
  });
}

function destroy(req, res) {
  db.Bird.findByIdAndRemove(req.params.birdId, function(err, bird) {
    if (err) {
      console.log(`Failed to delete bird id ${req.params.birdId}`);
      return;
    }

    res.json(bird);
  });
}

function show(req, res) {
  db.Bird.findById(req.params.birdId, function(err, bird) {
    if (err) {
      console.log(`Cannot find bird id ${req.params.birdId} in db`);
      return;
    }

    res.json(bird);
  });
}

//public methods
module.exports = {
  index: index,
  create: create,
  update: update,
  destroy: destroy,
  show: show,
}

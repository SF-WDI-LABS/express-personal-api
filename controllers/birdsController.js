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






//public methods
module.exports = {
  index: index,
  create: create,
}

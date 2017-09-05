let db = require('../models');
// controllers/cliffsController.js
// GET /api/cliffs
function index(req, res) {
  // send back all cliffs as JSON
  db.Cliff.find(function(err, albums){
    if (err) {
      console.log("index error" + err);
      res.sendStatus(500);
    }
    res.send(albums);
  });
}

// POST /api/cliffs
function create(req, res) {
  //create cliff using form data from req parameter
  var newCliff = new db.Cliff({
    name: req.body.cliffName,
    nearestCity: req.body.nearestCity,
    gpsCoords: req.body.gpsCoords,
    height: req.body.height,
    accessibility: req.body.accessibility,
    description: req.body.description
  });
  // add that cliff to the database
newCliff.save(function(err, cliff){
  if (err) {
   console.log("create error: " + err);
   return;
  }
  console.log("created", cliff.name);
  res.json(cliff);
});
}

// GET /api/cliffs/:cliffId
function retrieve(req, res) {
}

// DELETE /api/cliffs/:cliffId
function destroy(req, res) {
  console.log(req.params.id);
  db.Cliff.findByIdAndRemove(req.params.id, (err, Cliff) => {
    console.log(Cliff);
    if (err) {
      console.log(err);
    }
    Cliff.save(function(err, cliff) {
      console.log("hi");
      if (err) {
        console.log(err);
      }
      let response = {
          message: "Cliff successfully deleted",
    }
    res.status(200).send(response);
  });
});
};


function update(req, res) {
  db.Cliff.findById(req.params.id, function(err, foundCliff) {
    if (err) {
      console.log('err', err);
      return;
    }
    foundCliff.set({
      name: req.body.cliffName,
      nearestCity: req.body.nearestCity,
      gpsCoords: req.body.gpsCoords,
      height: req.body.height,
      acessibility: req.body.accessibility,
      description: req.body.description,
    });
    foundCliff.save(function(err, updateCliff) {
      if (err) {
        console.log(err);
      }
      console.log('update cliff', updateCliff);
      res.json(updateCliff);
    });
  });
};



module.exports = {
  index: index,
  create: create,
  retrieve: retrieve,
  destroy: destroy,
  update: update
};

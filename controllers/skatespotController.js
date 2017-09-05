/************
 * DATABASE *
 ************/

var db = require('../models');

// // GET /api/skatespots
// function index(req, res) {
//   db.Skatespot.find({}, function(err, allSpots){
//     res.json(allSpots);
//   });
// }
//
// // POST /api/skatespots
// function create(req, res) {
//  console.log('body', req.body);
//  var attributes = req.body.attributes.split(',').map(function(item){
//    return item.trim();})
//    req.body.attributes = attributes;
//  db.Skatespot.create(req.body, function(err,skatespot){
//    if(err) {console.log('error',err);}
//    console.log(skatespot);
//    res.json(skatespot);
//  })
// }
//
// // GET /api/skatespots/:skatespotId
// function show(req, res) {
//   db.Skatespot.findById(req.params.skatespotId, function(err, foundSkatespot) {
//     if(err) { console.log('skatespotController.show error', err); }
//     console.log('skatespotController.show responding with', foundSkatespot);
//     res.json(foundSkatespot);
//   });
// }

// DELETE /api/skatespots/:skatespotsId
function destroy(req, res) {


}

// PUT or PATCH /api/skatespots/:skatespotsId
function update(req, res) {

}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};

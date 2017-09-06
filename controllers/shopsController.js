//Database 

var db = require('../models');

// GET /api/shops
function index(req, res) {
  // send back all shops as JSON
  db.Shop.find({}, function(err, allShops) {
    res.json(allShops);
  });
}

// POST /api/shops
function create(req, res) {
  // create an shop based on request body and send it back as JSON
  console.log('body', req.body);

  // split at comma and remove and trailing space

  db.Shop.create(req.body, function(err, shop) {
    if (err) { console.log('error', err); }
    console.log(shop);
    res.json(shop);
  });
}

// GET /api/albums/:shopId
function show(req, res) {
  // find one album by id and send it back as JSON
  db.Show.findById(req.params.showId, function(err, foundShop) {
    if(err) { console.log('albumsController.show error', err); }
    console.log('shopsController.show responding with', foundShop);
    res.json(foundShop);
  });
}


// DELETE /api/albums/:albumId
function destroy(req, res) {
  console.log(req.params.shopId)
  // find one album by id, delete it, and send it back as JSON
  db.Shop.findByIdAndRemove(req.params.shopId, function(err, deleteShop) {
    if(err) { console.log('albumsController.destroy error', err); }
    console.log('albumsController.destroy responding with', deleteShop);
    res.json(deleteShop);
  });
}
















// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  // update: update
};

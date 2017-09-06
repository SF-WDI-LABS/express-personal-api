// shopsSongsController
var db = require('../models');


// POST '/api/shops/:shopId/songs'
function create(req, res) {
  db.Shop.findById(req.params.shopId, function(err, foundShop) {
    console.log(req.body);
    var newShop = new db.Shop(req.body);  // dangerous, in a real app we'd validate the incoming data
    foundShop.shops.push(newShop);
    foundShop.save(function(err, savedShop) {
      console.log('newShop created: ', newShop);
      res.json(newShop);  // responding with just the song, some APIs may respond with the parent object (Album in this case)
    });
  });
}


module.exports = {
  create: create
};

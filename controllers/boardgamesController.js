

var db = require('../models');


// function for initial page render
function index (req, res) {
  // console.log('Reached index controller');
  db.Boardgame.find({}, function (err, allGames) {
    if (err) {
      console.log('error from controller idex', err);
    }
    res.json(allGames);
  })


}










module.exports = {
  index: index,
}

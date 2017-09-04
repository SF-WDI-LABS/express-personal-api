var db = require("../models");

function getHeroes(req, res){
  db.Hero.find({}, function(err, allHeroes){
    res.json(allHeroes);
  });
}

module.exports = {
  index: getHeroes
}

var db = require("../models");

function getHeroes(req, res){
  db.Hero.find({}, function(err, allHeroes){
    res.json(allHeroes);
  });
}

function getHero(req, res){
  db.Hero.create(req.body, function (err, hero){
    if (err){
      console.log("error")
    }
    res.json(hero);
  })
}

module.exports = {
  index: getHeroes,
  create: getHero
}

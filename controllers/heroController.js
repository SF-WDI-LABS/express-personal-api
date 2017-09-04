var db = require("../models");

function getHeroes(req, res){
  db.Hero.find({}, function(err, allHeroes){
    res.json(allHeroes);
  });
}

function createHero(req, res){
  console.log("working");
  db.Hero.create(req.body, function (err, hero){
    if (err){console.log("error");}
    console.log("hero");
    res.json(hero);
  });
}

function deleteHero(req, res) {
  console.log("working")
  db.Hero.findByIdAndRemove(req.param.heroId, function(err, hero){
    res={
      id: hero._id
    }
  })
}

module.exports = {
  index: getHeroes,
  create: createHero,
  delete: deleteHero
}

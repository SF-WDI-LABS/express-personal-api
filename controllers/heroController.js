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
  console.log("delete working");
  db.Hero.findOneAndRemove({_id: req.params.heroId}, function(err,hero){
    if (err){console.log("error");}
    console.log("delete really working")
    res.json(hero);
  })
}

module.exports = {
  index: getHeroes,
  create: createHero,
  delete: deleteHero
}

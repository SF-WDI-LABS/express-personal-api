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
  db.Hero.findOneAndRemove(req.params.Id, function(err,hero){
    if (err){console.log("error");}
    res.send("Delete complete")
  })
}

module.exports = {
  index: getHeroes,
  create: createHero,
  delete: deleteHero
}

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const BoardgameSchema = new Schema({
  title: String,
  description: String,
  playtime: String,
  players: String,
  image: String,
});

const Boardgame = mongoose.model('Boardgame', BoardgameSchema);

module.exports = Boardgame;

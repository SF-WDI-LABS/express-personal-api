var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Shop = require('./shop');

var ShopSchema = new Schema({
  shopName: String,
  careTakerType: String,
  address: String,
  phoneNumber:  String ,
  website: String,
  image: String, 
});

var Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;






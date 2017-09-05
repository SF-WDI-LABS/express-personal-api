var db = require("./models");
var Sammich = db.Sammich;

var sammich_data = [
  {
      name: "The Bird",
      description: "blah blah",
      address: "115 New Montgomery St, San Francisco, CA 94105",
      image: "https://s3-media4.fl.yelpcdn.com/bphoto/GmfBOrixXbhs8vboJBjbKw/o.jpg",
      coordinates: [-122.400015,37.787303]
  },
  {
    name: "Salumeria",
    description: "blah blah",
    address: "3000 20th St, San Francisco, CA 94110",
    image: "https://s3-media4.fl.yelpcdn.com/bphoto/YbkGdHwogMw71p927Ig_DA/o.jpg",
    coordinates: [-122.411056,37.759281]
  },
  {
    name: "Marlowe",
    description: "blah blah",
    address: "500 Brannan St, San Francisco, CA 94107",
    image: "https://s3-media3.fl.yelpcdn.com/bphoto/T6C4z4yepdKpDKnhVAZ2BQ/o.jpg",
    coordinates: [-122.396778,37.778334]
  }
];

db.Sammich.remove({}, function youHavedestroyedAllTheSammiches(){

  db.Sammich.create(sammich_data, function hereAreSomeSammiches(err, sammiches){
    if (err) { return console.log(err); }
    console.log(`Created ${sammiches.length} sammiches!`);
  });

});

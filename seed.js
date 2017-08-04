// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_place = [{
                  name:"Mauritius",
                  description:"Mauritius, an Indian Ocean island nation, is known for its beaches, lagoons and reefs. The mountainous interior includes Black River Gorges National Park, with rainforests, waterfalls, hiking trails and wildlife like the flying fox.",
                  image:"http://www.info-mauritius.com/english/wp-content/uploads/2016/06/mauritius-in-picturesa.jpg"},
                  {
                    name: "Death Valley National Park",
                 description:"In this below-sea-level basin, steady drought and record summer heat make Death Valley a land of extremes. Yet, each extreme has a striking contrast. Towering peaks are frosted with winter snow. Rare rainstorms bring vast fields of wildflowers. Lush oases harbor tiny fish and refuge for wildlife and humans. Despite its morbid name, a great diversity of life survives in Death Valley.",
                  image:"https://npca.s3.amazonaws.com/images/8696/8d5006eb-116e-43ca-8c5f-9b376a78d152-banner.jpg?"
                },
                { name: "Yosemite National Park",
                  description:"Yosemite National Park is in California’s Sierra Nevada mountains. It’s famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome.",
                  image:"http://mustseeplaces.eu/wp-content/uploads/2015/03/yosemite-national-park-lake-in-summer.jpg"
                },
                {
                  name:"Crater Lake National Park",
                  description:"Crater Lake National Park is in the Cascade Mountains of southern Oregon. It’s known for its namesake Crater Lake, formed by the now-collapsed volcano, Mount Mazama. Wizard Island is a cinder cone near the western edge of the lake.",
                  image:"http://www.americansouthwest.net/oregon/photographs700/discovery-point.jpg"
                }];


db.Place.create(new_place, function(err, place){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new place", place._id)
  process.exit(); // we're all done! Exit the program.
})

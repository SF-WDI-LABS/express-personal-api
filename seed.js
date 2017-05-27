// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var pie_data = [
    {
        donor_name: "robino",
        pie_type: "peach blackberry"
        pie_quantity: 6
    },
    {
        donor_name: "bat bat",
        pie_type: "strawberry rhubarb"
        pie_quantity: 3
    },
    {
        donor_name: "kat",
        pie_type: "curried lentil"
        pie_quantity: 2
    },
    {
        donor_name: "patty-san",
        pie_type: "pear rasberry"
        pie_quantity: 5
    }
]

db.Pie.remove({}, function youAteBearsPies() {
    db.Pie.create(pie_data, function pieDonors(err, pies) {
        if(err) {return console.log(err);}
        console.log(`Sent ${pies.length} to Bear!`);
    });
});

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

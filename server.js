// require express and other modules
var express = require('express'),
app = express();


// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
* DATABASE *
************/

var db = require('./models');

/**********
* ROUTES *
**********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
* HTML Endpoints
*/

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
* JSON API Endpoints
*/

// Step 1a, 1 of 1
  //Show venues API data
app.get('/api/venues', function (req, res) {
  // send all venues as JSON response
  db.Venue.find()
    .exec(function(err, venues){
      if (err) { return console.log("index error: " + err); }
      res.json(venues);
    });
});

// Step 1b, 1 of 1
  //Show profile API data
app.get('/api/profile', function (req, res) {
  db.Profile.find()
    .exec(function(err, profiles){
      if (err) { return console.log("index error: " + err); }
      res.json(profiles);
    });
});


//Step 2, 1 of 2: Create
app.post('/api/venues', function (req, res) {
  // create new venue with form data (`req.body`)
  var newVenue = new db.Venue({
    name: req.body.name,
    location: req.body.location,
    website: req.body.website,
    image: req.body.image,
    notes: req.body.notes,
    imageBackground: req.body.imageBackground,
  });
  // save new venue in db
  newVenue.save(function(err, savedVenue) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(savedVenue);
    }
  });
});

//Step 2, 2 of 2: Updates the page
app.get('/api/venues/:id', function (req, res) {
db.Venue.findByIdAndUpdate(req.params.id, req.params.body, function (err, venues) {
  console.log('finding by ID');
    res.json(venues);
  });
});

  //Step 3, 1 of 1: Update notes
  app.put('/api/venue/:id', function(req,res){
  // get venue id from url params (`req.params`)
    console.log('venues notes updated', req.params);
    var venueId = req.params.id;
    // find the index of the venue we want to remove
    var updateVenueIndex = venues.findIndex(function(element, index) {
      return (element._id === parseInt(req.params.id)); //params are strings
    });
    console.log('updating venue with index', deleteVenueIndex);
    var venueToUpdate = venues[deleteVenueIndex];
    venues.splice(updateVenueIndex, 1, req.params);
    res.json(req.params);
  });

  // Step 4, 1 of 1: Delete
  app.delete('/api/venues/:id', function (req, res) {
    // get venue id from url params (`req.params`)
    console.log('venues delete', req.params);
    var venueId = req.params.id;
    // find the index of the venue we want to remove
    var deleteVenueIndex = venues.findIndex(function(element, index) {
      return (element._id === parseInt(req.params.id)); //params are strings
    });
    console.log('deleting venue with index', deleteVenueIndex);
    var venueToDelete = venues[deleteVenueIndex];
    venues.splice(deleteVenueIndex, 1);
    res.json(venueToDelete);
  });




/**********
* SERVER *
**********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

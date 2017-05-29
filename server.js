// require express and other modules
var express = require('express'),
    app = express();
    var db = require('./models');

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

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

var profile = {
  name: "Kabita Chatterjee",
  location: "San Francisco",
  email: "chatterjeekavita01@gmail.com",
  githubUsername: "kabitachatterjee",
  githubLink: "https://github.com/kabitachatterjee",
  linkedIn: "https://www.linkedin.com/in/kabitachatterjee/",
  career: "Freelance web-developer with a passion for making user-friendly  and creative web applications.I have worked in different industries from telecom to healthcare and would love to bring my experience in making the web simpler and user-friendly."
};

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/profile', function (req, res) {
  // send all books as JSON response
  console.log('myprofile index');
  res.json(profile);
});

/*
 * JSON API Endpoints
 */

 app.get('/api/places', function index(req, res) {
  // send all books as JSON response
  db.Place.find({}, function(err, places){
      if (err) { return console.log("index error: " + err); }
      res.json(places);
      //res.sendFile(__dirname + '/views/index.html');
    });
});

// get one place
app.get('/api/places/:id', function show(req, res) {
  // find one place by its id
  console.log('places show', req.params);

  db.Place.findById(req.params.id, function(err, place){

    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(place);
  //});

  });
});
// create new place
app.post('/api/places', function create(req, res) {
  // create new place with form data (`req.body`)
  console.log('places create', req.body);
  console.log(req.body);

   var newPlace = new db.Place(req.body);
  newPlace.save(function(err){
  console.log("Success");
});
  //res.json(newPlace);
  res.sendFile(__dirname + '/views/index.html');
});

// delete place
app.delete('/api/places/:id', function destroy(req, res) {
  // get book id from url params (`req.params`)
  console.log('places delete', req.params);
  var placeId = req.params.id;
  db.Place.remove({ _id: placeId }, function(err,places){
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.send("Deleted Successfully book with id: " + placeId );

  });
  //res.sendFile('views/index.html' , { root : __dirname});
});

// update book
app.put('/api/places/:id', function update(req,res){
// get book id from url params (`req.params`)
  console.log('place update', req.params);
  var placeId = req.params.id;
  // find the index of the book we want to remove
  var updatePlaceIndex = db.Place.findById(placeId, function(err, place) {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    var placeToUpdate = place;
    console.log(placeToUpdate);
    placeToUpdate.name = req.body.name;
    placeToUpdate.description = req.body.description;
    placeToUpdate.image = req.body.image;
    placeToUpdate.save();

    res.json({placeToUpdate});
    //res.sendFile('views/index.html' , { root : __dirname}
  });
  //console.log('updating book with index', bookToUpdate);
});

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    // woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/kabitachatterjee/express-personal-api/README.md", // CHANGE ME
    baseUrl: "https://polar-island-70720.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  })
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

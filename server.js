// require express and other modules
var express = require('express'),
    app = express();
    var db = require('./models');

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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
  cell: "650-307-8070",
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

  });
});
// create new place
app.post('/api/places', function create(req, res) {
  // create new place with form data (`req.body`)
  console.log('places create', req.body);
  console.log(req.body);

   var newPlace = new db.Place(req.body);
  newPlace.save(function(err,place){
    if(err){
      console.log("post error: " + err);
      res.sendStatus(500);
    }
  console.log("Success");
  res.redirect('/');
});
  //res.json(newPlace);
  //res.sendFile(__dirname + '/views/index.html');
  //res.redirect('/');
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
    //res.send("Deleted Successfully place with id: " + placeId );
    console.log("Deleted Successfully place with id: " + placeId);
    res.redirect('/');

  });
  //res.sendFile('views/index.html' , { root : __dirname});

});


app.put('/api/places/:id', function(req, res) {
  console.log(req.params.id);
    let place = db.Place.findById(req.params.id, function(err, place) {
        if (err) {
           console.log('error, place not found');
        }
        console.log(req.body);
        let formData = {
            name: req.body.name || place.name,
            description: req.body.description || place.description,
            image: req.body.image || place.image
        };
        console.log(formData);
        db.Place.update(place, formData, function(err, updatedPlaceListings) {
            if (err) {
               console.log('update place failed!');
            }
            res.send(updatedPlaceListings);
            console.log('place updated!');
        });
    });
});

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    // woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/kabitachatterjee/express-personal-api/README.md",
    baseUrl: "https://polar-island-70720.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/places", description:"A json with data about all places visited till date. The structure of each json object is as follows: {_id:'a unique identifier for each place',name:'name of the place', description: 'A short description of the place',image:'a URL pointing to an image of the place',-v:'which version of the data',created_at:'date timestamp of the time when the data was created and saved in the database'}"} ,
      {method: "POST", path: "/api/places", description: "Creates a new place/destination by taking input from a form. The inputs must have name, description and image populated."},
      {method: "PUT", path: "/api/places/:id", description: "Updates the data for a JSON object by its _id. It takes details from a user for the update."},
      {method: "DELETE", path: "/api/places/:id", description: "Deletes the data for a JSON object by its id"}

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

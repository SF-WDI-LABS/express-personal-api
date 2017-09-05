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

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/bschuetzle/express-personal-api/README.md", // CHANGE ME
    baseUrl: "https://gentle-oasis-42930.herokuapp.com", // CHANGE ME
    endpoints: [
      {
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints"
      },
      {
        method: "GET",
        path: "/api/profile",
        description: "Who I am and where I'm from"
      },
      {
        method: "GET",
        path: "/api/stairways",
        description: "Index of all the stairways"
      },
      {
        method: "POST",
        path: "/api/stairways",
        description: "Create a new stairway"
      },
      {
        method: "PUT",
        path: "/api/stairways",
        description: "Update a stairway"
      },
      {
        method: "DELETE",
        path: "/api/stairways",
        description: "Destroy a stairway"
      }
    ]
  })
});

app.get('/api/profile', function apiIndex(req, res) {
  res.json({
    name: "Bill Schuetzle",
    githubUsername: "bschuetzle",
    githubLink: "https://github.com/bschuetzle",
    githubProfileImage: "https://avatars1.githubusercontent.com/u/27898517?v=3&s=400",
    personalSiteLink: "https://bschuetzle.github.io/",
    currentCity: "San Francisco",
    hobbies: ["hiking","running","travelling","indoor climbing"]
  })
});


// route to get all stairways
app.get('/api/stairways', function index(req, res) {
  db.Stairway.find({}, function(err, docs) {
    res.json(docs);
  });
});

// route to create one new stairway
app.post('/api/stairways/', function create(req, res) {
  var newStairway = new db.Stairway ({
    name: req.body.name,
    description: req.body.description,
    neighborhood: req.body.neighborhood,
    photoURL: req.body.photoURL,
    numSteps: req.body.numSteps,
    rating: req.body.rating,
    difficulty: req.body.difficulty,
    favorite: true
  });
  newStairway.save(function (err, product, numAffected) {
    console.log(product);
    res.json(product);
  })
});

// route to delete one stairway using the id
app.delete('/api/stairways/:id', function destroy(req, res) {
  stairwayID = req.params.id;
  console.log("destroy stairwayID: ", stairwayID);
  db.Stairway.findOneAndRemove({ _id: stairwayID }, function(err, deletedStairway) {
    res.json(deletedStairway);
  });
});

// route to update one stairway using the id
app.put('/api/stairways/:id', function update(req, res) {
  console.log('put params:', req.params);
  stairwayID = req.params.id;
  console.log("update stairwayID: ", stairwayID);
  var updatedStairway = {
    name: req.body.name,
    description: req.body.description,
    neighborhood: req.body.neighborhood,
    photoURL: req.body.photoURL,
    numSteps: req.body.numSteps,
    rating: req.body.rating,
    difficulty: req.body.difficulty,
    favorite: true
  };
  db.Stairway.findOneAndUpdate({ _id: stairwayID }, updatedStairway, {}, function(err, updatedStairway) {
    res.json(updatedStairway);
  });
});



/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

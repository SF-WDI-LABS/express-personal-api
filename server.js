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

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

let controllers = require('./controllers');
/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/profile', function(req, res) {
  res.json({
    name: "Apichai Chenthanakij(Chen)",
    githubUserName: "achentha",
    githubLink: "https://github.com/achentha",
    githubProfileImage: "https://avatars2.githubusercontent.com/u/30161498?v=4&u=9f3d9d4479e61b9a8ed9ff4b8ca7440ec432ad54&s=400",
    personalSiteLink: "https://dry-scrubland-21249.herokuapp.com/",
    currentCity: "Fremont",
    pets: [
      {name: "Angel Face", type: "Cat", breed: "Tabby"},
      {name: "Clutch", type: "Cat", breed: "Tabby"},
      ]
    });
});

app.get('/api/birds', controllers.birds.index); // get all birds
app.get('/api/birds/:birdId', controllers.birds.show); // get one bird
app.post('/api/birds', controllers.birds.create); // create a new bird
app.put('/api/birds/:birdId', controllers.birds.update); // edit a bird
app.delete('/api/birds/:birdId', controllers.birds.destroy); // delete a bird

/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  res.json({
    message: "Welcome to my personal favorite birds api! Here's what you need to know!",
    documentationUrl: "https://github.com/achentha/express-personal-api/blob/master/README.md",
    baseUrl: "https://dry-scrubland-21249.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "About me"},
      {method: "GET", path: "/api/birds", description: "Show all my favorite birds"},
      {method: "GET", path: "/api/birds/:birdId", description: "Show a specified favorite birds"},
      {method: "POST", path: "/api/birds", description: "Add a new favorite bird"},
      {method: "PUT", path: "/api/birds/:birdId", description: "Modify a favorite bird"},
      {method: "DELETE", path: "/api/birds/:birdId", description: "Delete a favorite bird"},
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

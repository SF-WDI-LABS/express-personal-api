// require express and other modules
var express = require('express');
var app = express();

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

var controllers = require('./controllers');

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
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express-personal-api/README.md", // CHANGE ME
    baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  })
});

app.get('/api/profile', function apiProfile(req, res) {
  res.json({
      name: 'David Jue',
      githubUsername: 'Congocash',
      githubLink: 'https://github.com/CongoCash',
      githubProfileImage: '../public/images/github-image.png',
      personalSiteLink: 'https://peaceful-chamber-97994.herokuapp.com/',
      currentCity: 'San Francisco',
      hobbies: [{
        name: 'Basketball',
        yearsPlaying: 14
      },
      {
        name: 'Tetris',
        yearsPlaying: 6
      }]
  });
});

app.post('/api/movies', controllers.movies.create);
app.get('/api/movies', controllers.movies.index);
app.get('/api/movies/:movieid', controllers.movies.show);
app.delete('/api/movies/:movieid', controllers.movies.destroy);
app.put('/api/movies/:movieid', controllers.movies.update);
/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

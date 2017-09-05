// require express and other modules
var express = require('express'),
    app = express();
var db = require("./models")
var controllers = require('./controllers');

app.get('/api', controllers.api.index);

app.use(express.static('public'));
// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (next)
    next();
});

/************
 * DATABASE *
 ************/



/**********
 * ROUTES *
 **********/
app.get('/api/cliffs', controllers.cliffs.index);

app.post('/api/cliffs', controllers.cliffs.create);

app.delete('/api/cliffs/:id', controllers.cliffs.destroy);

app.put('/api/cliffs/:id', controllers.cliffs.update);

app.post('/api/cliffs/:id', controllers.cliffs.create);

app.get('/api/cliffs/:id', controllers.cliffs.retrieve);

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
    woopsIForgotToDocumentAllMyEndpoints: false, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/MaluPalu/express-personal-api/blob/master/DOCUMENTATION.md", // CHANGE ME
    baseUrl: "https://evening-beach-72520.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/cliffs", description: "List Cliff jumping specifiations"},
      {method: "POST", path: "/api/cliffs", description: "Add Cliff jumping specifiations"},
      {method: "PUT", path: "/api/cliffs/:id", description: "Update Cliff jumping specifiations"},
      {method: "DELETE", path: "/api/cliffs/:id", description: "Delete Cliff jumping specifiations"},
      {method: "GET", path: "/api/cliffs/:id", description: "Individual Cliff jumping specifiations"}
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

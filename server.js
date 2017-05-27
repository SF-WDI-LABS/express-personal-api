// require express and other modules
var express = require('express'),
    app     = express(),
    db      = require('./models');

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


/**********
 * ROUTES *
 **********/


// GET all the restaurants
 app.get('/api/restaurant', function index(req, res) {
   //console.log("Route to api/restaurant")
   //console.log(req.body)
   db.Restaurant.find({}, function(err, allRestaurants){
     console.log({restaurants: allRestaurants})
     res.json({restaurants: allRestaurants})

   })
 })

 app.get('/api/restaurant/:id', function show(req, res){
   console.log(req.params)
   console.log("Route to api/restaurants/:id")
 });

// app.post('/api/restaurants', function(){
//   console.log({})
// });


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
    documentationUrl: "https://github.com/example-username/express-personal-api/README.md", // CHANGE ME
    baseUrl: "https://nameless-wildwood-79906.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path:"/api/restaurants", description: "Data about all the best restaurants in Berkeley"},
      {method: "POST", path: "/api/", description: "Create new entry for a great restaurant"}, // CHANGE ME
      {method: "PUT", path: "/api/the-thing/:id", decription: "Update information about the restaurant"},
      {method: "DELETE", path: "/api/the-thing/:id", description: "delete a restaurant"}
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

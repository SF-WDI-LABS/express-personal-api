// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
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
var createSeedData = require('./seed');
var Pie = db.Pie;

// clear Pies for Bear section data after each reload ??
Pie.deleteMany({}, function(err) {
    console.log('clear successful!');
});
createSeedData();

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
    woopsIForgotToDocumentAllMyEndpoints: false, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/KatTsukuda/kat-tsukuda-pie-api", // CHANGE ME
    baseUrl: "https://floating-sands-94136.herokuapp.com/", // herokuapp url
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "digital strategist, analyst, and graphic designer, learning to code."}, // brief about me
      // retrieve key values from database
      {method: "GET", path: "/api/pies", description: "Index of all pies donated to Bear"},
      {method: "POST", path: "/api/pies", description: "Create a new pie donation entry"},
      {method: "PUT", path: "/api/pies/:id", description: "Edit a previous pie donation entry"},
      {method: "DELETE", path: "/api/pies/:id", description: "Destroy a pie donation :("},
       // app description
    ]
  })
});

// PROFILE ENDPOINT
app.get("/api/profile", function profile(req, res){
    let myProfile = {
        name: "kat tsukuda",
        githubUsername: "KatTsukuda",
        currentCity: "SF",
        favoriteFood: "oatmeal with berries"
    };
    res.json(myProfile);
});

// SHOW ALL THE PIES
app.get("/api/pies", function index(req, res) {
    Pie.find({}, function(err, pies) {
        res.send(pies);
    });
});

// GET PIE DONATION INFO BY ID
app.get("/api/pies/:id", function show(req, res){
    let id = req.params.id;
    Pie.findOne({_id: id}, function(err, pie){
        res.json(pie);
  });
})

// CREATE NEW PIE DONATION LOG
app.post("/api/pies", function create(req, res) {
    // create new pie donation with form data (`req.body`)
    console.log('POST REQUEST FOR DATA: ', req.body);
    // The object of the post request containing data for the Pie model
    var newPie = new Pie(req.body);

    newPie.save(function (err, pie) {
        if(err) {
            console.log("no new pie(s) made. :( try again.)", err);
            res.sendStatus(404);
        }
        res.json(pie);
    });
});

// RETRACT AND REMOVE PIE DONATION ORDER
app.delete("/api/pies/:id", function(req, res) {
    res.sendStatus(204); // confirmation
})

// UPDATE PIE DONATION ORDER
app.put("/api/pies/:id", function update(req, res){
    res.send({})
})

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
    console.log('Express server is up and running on http://localhost:3000/');
});

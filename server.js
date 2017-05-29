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

 var db = require("./models")
 var Duck = db.Duck;
 var Student = db.Student;

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/**********************
 * HTML API ENDPOINTS *
 **********************/

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/**********************
 * JSON API ENDPOINTS *
 **********************/

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to the protected brushlands api documentation",
    documentationUrl: "https://github.com/alyshae/express-personal-api/blob/master/README.md", //changed
    baseUrl: "https://protected-brushlands-10545.herokuapp.com/", //changed
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints for this website"},
      {method: "GET", path: "/api/profile", description: "About Aly"}, //changed
      {method: "GET", path: "/api/ducks", description: "Index of all the WDI38 ducks"},
      {method: "POST", path: "/api/ducks", description: "Add a new feathered, full-stack friend"}, //changed
      {method: "PUT", path: "/api/ducks/:id", description: "Edit information about a duck"},
      {method: "DELETE", path: "/api/ducks/:id", description: "Remove a duck who has gone up to the big pond in the sky"}
    ]
  })
});

//  /api/profile hard-coded information:
app.get('/api/profile', function apiProfile(req, res) {
  res.json({
    name: "Aly Walas",
    githubUsername: "https://github.com/alyshae",
    githubProfileImage: "https://avatars1.githubusercontent.com/u/23345886?v=3&u=426d1edbf944c84580e5a03d9cc9cd25ee61cf76&s=400",
    currentCity: "San Francisco, CA",
    pets: [{
      name: "Quintzy Polamalu Sunset McTinyPaws",
      type: "Feline",
      breed: "Calico"
    }]
  });
});


//  index - "get" all ducks:
app.get('/api/ducks', function index(req, res) {
  Duck.find({}, function(err, ducks) {
    if (err) {
      return console.log("error: ", err)
    }
    res.json(ducks);
  });
});


//   show - "get" one duck by id:
app.get('/api/ducks/:id', function show(req, res) {
  var duckId = req.params.id;
  Duck.findOne({_id: duckId}, function(err, selectedDuck) {
    if (err) {
      return console.log("error: ", err)
    }
    res.json(selectedDuck);
  });
});


//    create - "post" new duck (& save):
app.post("/api/ducks", function create(req, res) {
  console.log(`made it to the POST route with: params: ${req.params}, query: ${req.query} and body: ${req.body}.`);
  var newDuck = new Duck(req.body);

  newDuck.save(function(err, duck) {
    if (err) {
      console.log("error: ", err);
      res.sendStatus(404);
    }
    res.json(duck);
  });
});


//   destroy - "delete" one duck by id:
app.delete("/api/ducks/:id", function destroy(req, res) {
  var duckId = req.params.id;
  console.log(`made it to the DELETE route with: params: ${duckId}.`);

  db.Duck.findOneAndRemove({ _id: duckId }, function (err, deadDuck) {
    res.json(deadDuck);
  });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

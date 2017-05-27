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


var things = [
  {
    id: 1,
    name: "thing1",
    description: "thing1 description"
  },
  {
    id: 2,
    name: "thing2",
    description: "thing2 description"
  },
  {
    id: 3,
    name: "thing3",
    description: "thing3 description"
  },
  {
    id: 4,
    name: "thing4",
    description: "thing4 description"
  }
]

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
    documentationUrl: "https://github.com/example-username/express-personal-api/README.md", // CHANGE ME
    baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints"
      },
      {
        method: "GET",
        path: "/api/profile",
        description: "Data about me"
      },
      {
        method: "POST",
        path: "/api/campsites",
        description: "E.g. Create a new campsite"
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
    personalSiteLink: "",
    currentCity: "San Francisco",
    pets: []
  })
});

app.get('/api/things', function index(req, res) {
  res.json(things);
});

app.get('/api/things/:id', function show(req, res) {
  thingID = parseInt(req.params.id);
  console.log("thingID: ", thingID);
  things.forEach(function(element, index) {
    if (element.id === thingID) {
      res.json(element);
      return;
    }
  })
});

app.post('/api/things/', function create(req, res) {
  console.log("req body: ", req.body);
  console.log("req query: ", req.query);
  /*
  // for use with query ? (postman)
  var newThing = new db.Thing ({
    name: req.query.name,
    description: req.query.description
  });
  */
  // for user with data: {}
  var newThing = new db.Thing ({
    name: req.body.name,
    description: req.body.description
  });
  newThing.save();
  things.push(req.body);
  res.json(req.body);
});

app.put('/api/things/:id', function update(req, res) {
  thingID = parseInt(req.params.id);
  console.log("put thingID: ", thingID);
  console.log("req query: ", req.query);
  things.forEach(function(element, index) {
    if (element.id === thingID) {
      element.name = req.query.name;
      element.description = req.query.description;
      res.json(element);
      return;
    }
  })
});

app.delete('/api/things/:id', function destroy(req, res) {
  thingID = parseInt(req.params.id);
  console.log("destroy thingID: ", thingID);
  things.forEach(function(element, index) {
    if (element.id === thingID) {
      things.splice(index, 1);
      res.json(element);
      return;
    }
  })
});


/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

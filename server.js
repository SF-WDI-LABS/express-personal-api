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
var db = require('./models');

var nationalparks = [
  {
    _id: 1,
    park: "Death Valley"
    location: "California"
    image: "http://i.imgur.com/aNW2rb6.jpg"
    year_established: "1994"
  },
  {
    _id: 2,
    park: "Yosemite"
    location: "California"
    image: "http://i.imgur.com/3gIl6Eo.jpg"
    year_established: "1890"
  },
  {
    _id: 3,
    park: "Zion"
    location: "Utah"
    image: "http://i.imgur.com/5toZrZM.jpg"
    year_established: "1919"
  }
];

var newParkIDUpdated = 4;

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
    message: "Welcome to Nuranne's National Park api!",
    documentationUrl: "https://github.com/nuranned/express-personal-api/README.md",
    baseUrl: "https://arcane-meadow-99416.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Who I am and where I'm from"},
      {method: "GET", path: "/api/nationalparks", description: "Index of national parks I want to see"},
      {method: "POST", path: "/api/nationalparks", description: "Create a new national park I should see"},
      {method: "PUT", path: "/api/nationalparks/:id", description: "Edit national park info"},
      {method: "DELETE", path: "/api/nationalparks/:id", description: "Destroy/Remove national park"}
    ]
  })
});

//show all nationalparks
app.get('/api/nationalparks', function (req, res) {
  //send all nationalparks as JSON response
  console.log('nationalparks index');
  res.json(nationalparks);
});

//create new national park
app.post('/api/nationalparks', function (req, res) {
  //create new ntlpark with form data ('req.body')
  console.log('nationalparks create', req.body);
  var newPark = req.body;
  newPark._id = newParkIDUpdated++;
  nationalparks.push(newPark);
  res.json(newPark);
});

//update/edit national park
app.put('/api/nationalparks/:id', function(req, res) {
  //get park id from url params ('req.params')
  console.log('parks update', req.params);
  var parkId = req.params.id;
  // find the index of the park to remove
  var updateParkIndex = nationalparks.findIndex(function(element, index) {
    //params are strings
    return (element._id === parseInt(req.params.id));
  });
  console.log('updating nationalparks with index', deleteParkIndex);
  var parkToUpdate = nationalparks[deleteParkIndex];
  nationalparks.splice(updateParkIndex, 1, req.params);
  res.json(req.params);
});

//destroy/remove national park
app.delete('/api/nationalparks/:id', function (req, res) {
  // get park id from url params ('req.params')
  console.log('parks delete', req.params);
  var parkId = req.params.id;
  // find the index of the park to remove
  var deleteParkIndex = nationalparks.findIndex(function(element, index) {
    return (element._id === parseInt(req.params.id));
  });
  console.log('deleting nationalpark with index', deleteParkIndex);
  var parkToDelete = nationalparks[deleteParkIndex];
  nationalparks.splice(deleteParkIndex, 1);
  res.json(parkToDelete);
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('National Park app listening at http://localhost:3000/');
});

//  function () {
//   console.log('Express server is up and running on http://localhost:3000/');
// });

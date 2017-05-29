// require express and other modules
let express = require('express'),
    app = express();

let bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//====================================
// DATABASE

// var db = require('./models');

//====================================
// ROUTES
let Mushroom = db.Mushroom;

// Serve static files from the `/public` directory:
app.use(express.static('public'));

//====================================
//HTML Endpoints


app.get('/api/mushrooms', function index(request, response) {
  Mushroom.find({}, function(err, mushrooms){
  response.send(mushrooms); // Return all mushrooms
// response.sendFile('/api/mushrooms/views/index.html');
  }
});

app.get('/api/mushrooms/:id', function index(request, response) {
  Mushroom.findOne({_id: id}, function(err, mushroom){
  let id = request.params.id;
  response.send(mushroom); // Return new mushroom
  )}
});

app.post("/api/mushrooms:id", function create(request, response){
  let id = request.params.id;
  let body = request.params.body;
  Mushroom.createOne(body);
  response.send({});  // Return the new mushroom
});

app.delete("/api/unicorns/:id", function destroy(request, response){
  response.sendStatus(204); // Return delete-succeess message
})

app.put("/api/unicorns/:id", function update(request, response){
  response.send({}) // Return the updated mushroom
})


});


//====================================
// JSON API Endpoints

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

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

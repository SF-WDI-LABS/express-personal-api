//doing first git commit
// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.json());

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

/*
 * HTML Endpoints
 */

// app.get('/api/hackathons', function homepage(req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });


/*
 * JSON API Endpoints
 */

app.get('/api', function (req, res) {
  console.log('is this working?');
  res.send({ name: "Javascriptttt"});
});


//working
app.get("/api/hackathons", function index(req, res){
   console.log("ryu and luigi");
   res.send("mario and guile");
   res.end();
 })


//  app.get("/api/hackathons/:id", function show(req, res){
//    var id = req.params.id;
//    Hackathon.findOne({_id: id}, function(err, hackathon){
//      res.send(hackathon); // one hackathon
//    });
//  })
//

//tested and working
 app.post("/api/hackathons", function create(req, res){
   console.log("Hit POST /api/hackathons, with the following:")
  //  console.log("params:", req.params)
  //  console.log("query:", req.query)
   console.log("body:", req.body)
   res.send(req.body);  // one newly created hackathon
 })

//  app.delete("/api/hackathons/:id", function destroy(req, res){
//    res.sendStatus(204); // just saying we did it
//  })
//
//  app.put("/api/hackathons/:id", function update(req, res){
//    res.send({}) // one updated hackathon
//  })
//
//
//
//
//
//















console.log("hello");


app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    name: "John Ko",
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/umichdoe/express-personal-api/README.md", // CHANGE ME
    baseUrl: "https://sheltered-ravine-19400.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"}, // DONE #1
      {method: "GET", path: "/api/profile", description: "A little about me"}, // DONE #2 PROFILE
      {method: "GET", path: "/api/hackathons", description: "Index of all the popular languages used at hackathons"}, // DONE #3
      {method: "POST", path: "/api/hackathons", description: "Create or add a new hackathon language"}, // DONE #4
      {method: "PUT", path: "/api/hackathons/:id", description: "Edit a hackathon language and update it."}, //  DONE #5
      {method: "DELETE", path: "/api/hackathons/:id", description: "Destroy a hackathon language"} // #6
    ]
  })
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000);

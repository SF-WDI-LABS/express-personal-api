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
   db.Restaurant.find({}, function(err, allRestaurants){
     res.json(allRestaurants)
   })
 });

 app.post('/api/restaurant', function(req, res){
   let newRest = new db.Restaurant({
     name: req.body.name,
     number_of_stars: req.body.number_of_stars,
     type: req.body.type,
     address: req.body.address,
     notes: req.body.notes
   })

   newRest.save(function(err, book){
     res.json(newRest)
   })
})

/*app.put('/api/restaurant/:id', function update(req, res) {
  // get todo id from url params (`req.params`)
  var restId = parseInt(req.params.id);

  // find todo to update by its id
  var restToUpdate = todos.filter(function (todo) {
    return restaurants._id == restId;
  })[0];

  // update the todo's task
  restToUpdate.task = req.body.task;

  // update the todo's description
  restToUpdate.notes = req.body.notes;

  res.json(restToUpdate);
}); */

// delete restaurant
app.delete('/api/restaurant/:id', function (req, res) {
  // get rest id from url params (`req.params`)
  console.log('restaurant delete', req.params);
  var restId = req.params.id;
  // find the index of the book we want to remove
  db.Restaurant.findOneAndRemove({ _id: restId}, function (err, deletedRest) {
    res.json(deletedRest);
  });
});


app.use(express.static('public'));

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// profile

app.get('/api/profile', function index(req, res) {
  db.Profile.find({}, function(err, profile){
    console.log(profile)
    res.json(profile)
  })
});


app.get('/api', function apiIndex(req, res) {
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express-personal-api/README.md",
    baseUrl: "https://nameless-wildwood-79906.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path:"/api/restaurants", description: "Data about all favorite restaurants"},
      {method: "POST", path: "/api/", description: "Create new entry for a great restaurant"},
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

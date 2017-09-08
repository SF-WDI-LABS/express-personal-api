// require express and other modules
var express = require('express'),
    app = express(),

    db= require('./models');
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

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/************
 * DATABASE *
 ************/

 let profile = [
   {
     name: 'Joanne Cabling',
     githubUsername: 'jojobeth1',
     githubLink:'https://github.com/jojobeth1',
     githubProfileImage: 'https://github.com/jojobeth1',
     personalSiteLink: '',
     currentCity: 'San Francisco',
     favoriteThings: [
       {name: 'Noah', nounType: 'person', description:'My son'},
       {name: 'John', nounType: 'person', description:'My husband'},
       {name: 'Joey', nounType: 'person', description:'My dad'},
       {name: 'Disneyland', nounType: 'place', description:'place to go with family'},
       {name: 'Graphic Design', nounType: 'thing', description:'my other abilities'},
       {name: 'Cold Brew Coffee', nounType: 'thing', description:'favorite beverage'},
       {name: 'Tokyo', nounType: 'place', description:'I want to visit.'}
   ]}
 ]

// var db = require('./models');

/**********
 * ROUTES *
 **********/


/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */


//API Document with endpoints
app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Joanne's API",
    documentationUrl: "https://github.com/jojobeth1/express-personal-api",
    baseUrl: "https://intense-shore-41319.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/projects", description: "Index of all of my projects"},
      {method: "GET", path: "/api/profile", description: "About me"},
      {method: "POST", path: "/api/projects", description: "Create a new project"},
      {method: "PUT", path: "/api/projects/:id", description: "Edit and update previous project."},
      {method: "DELETE", path: "/api/projects/:id", description: "Delete a project entry"}

    ]
  })
});

//GET Profile
app.get('/api/profile', function (req, res) {
 // send profile as JSON response
 res.json(profile);
});

//GET index of Projects
app.get('/api/projects', function (req, res) {
  // send all books as JSON response
  db.Projects.find({})
    //.populate;
    .exec(function(err, projects){
      if (err) { return console.log("index error: " + err);
    }
      res.json(projects);
    });
});


//CREATE a project
app.post('/api/projects', function (req, res) {
  // create new book with form data (`req.body`)
  var newProject = new db.Projects(req.body);
  // save new project to database
  newProject.save(function(err, savedProject){
    res.json(savedProject);
  });
});

//GET by id
// get one book
app.get('/api/projects/:id', function (req, res) {
  // get project id from url params ('req.params')
  db.Projects.findOne({_id: req.params.id }, function(err, foundID) {
    res.json(foundID);
  });

});


//(PUT/PATCH) This endpoint will UPDATE a single project
app.put('/api/projects/:id', function update(req, res) {

// Create new project with form data (`req.body`)
  var newProject = new db.Projects({
    name: req.body.name,
    githubRepoUrl: req.body.githubRepoUrl,
    deployedUrl: req.body.deployedUrl,
    screenshot: req.body.screenshot
  });
  console.log('')
});


//DELETE

app.delete('/api/todos/:id', function (req, res) {
  // get project todo id from url params (`req.params`)
  var projectId = req.params.id;

  // find todo in db by id and remove
  Todo.findOneAndRemove({ _id: projectId }, function (err, project) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(deletedProject);
    }
  });
});





/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

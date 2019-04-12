// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var controllers = require('./controllers');

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

//CRUD
app.get('/story/index', controllers.story.index);
app.post('/story/create', controllers.story.create);
app.get('/story/show/:story_id', controllers.story.show);
app.put('/story/update/:story_id', controllers.story.update);
app.delete('/story/delete/:story_id', controllers.story.destroy);

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

// HTML page for the api documentation
app.get('/', function(req,res){
  res.sendFile(__dirname + '/views/api.html');
});

// My personal dashboard using my api
app.get('/story', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */


// Main guidance of all endpoints
app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/hmliao14/express-personal-api/blob/master/README.md",
    baseUrl: "https://frozen-lowlands-63435.herokuapp.com",
    data_endpoints: [
      {method: "GET", path: "/", description: "A HTML page that describes all available endpoints"},
      {method: "GET", path: "/api", description: "A JSON view page that describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/images", description: "Images I took from my LA trip"},
      {method: "GET", path: "/api/videos", description: "Open source videos that I found interesting"},
    ],
    CRUD_endppoints: [
      {method: "GET", path: "/story/index", description: "Retreat all records in story database and render them onto index.html, with additional GUI that user CRUD all records"},
      {method: "POST", path: "/story/create", description: "Create a entry in the story database after a JSON object is sent to the server", required_JSON_obj_format:{form_title : 'String', form_description: 'String', form_link: 'String'}},
      {method: "GET", path: "/story/show/:story_id", description: "Display a single record in the database matching the given id"},
      {method: "PUT", path: "/story/update/:story_id", description: "Update an existing database record with a matched story data-id in the url. Also need send JSON object to the server", required_JSON_obj_format:{name: "String", description: "String"}},
      {method: "DELETE", path: "/story/delete/:story_id", description: "Delete an existing database record matching the given story id in the url"},
    ]
  })
});


// Following are specific endpoints (hardcoded)
// Api profile
app.get('/api/profile', function (req, res) {
  res.json({
    profile:{
      name: "Huan Ming Liao",
      githubUsername: "hmliao14",
      githubLink: "https://github.com/hmliao14",
      githubProfileImage: "https://avatars2.githubusercontent.com/u/19638770?v=4&s=400",
      personalSiteLink: "https://hmliao14.github.io/",
      currentCity: "San Francisco",
      hobbies: [{
          name: "Down to Earth",
        description: "I enjoy hanging out with friends to try new food and do crazy stuff."
        },{
          name: "Movie Fantasy",
          description: "Comedy, Sci-Fi, Action, and story with mind-blowing twist are my favorite genres."
        },{
          name: "Causal Gaming",
          description: "I occasionally practice my logical thinking and analytical skills through an online card game called Hearthstone"
        },{
          name: "Outdoor Adventure",
          description: "Not all the time its about going to specific places with a goal in mind. There are times when my friends and I take on unknown hiking trail and explore random cities and suburban"
        }],
    }
  })
});

// Api template for images
// sample_background are images I found online thats interesting
// LA_trip has actual images I took during my trip to Los Angeles
app.get('/api/images', function(req, res){
  res.json({
    LA_trip: [
        {
        name: "Delicious Dessert!",
        link: "/images/LA_trip/casino_dessert.jpg",
        description: "Some awesome dessert I had at Morongo Casino Resort"

        },{
        name: "Chinese Theatre",
        link: "/images/LA_trip/chinese_theatre.jpg",
        description: "One of the popular lankmarks at the Hollywood Boulevard, Los Angeles"
        }, {
        name: "Macaroon",
        link: "/images/LA_trip/macaroon.jpg",
        description: "What can I say? They are some soft little sweet treat!"
        }, {
        name: "Oscar EVERYWHERE!",
        link: "/images/LA_trip/oscar.jpg",
        description: "Oscars I have achieved in my life haha. (Not)"
        }
      ]
  });
});

// Api template for videos that i found online and its interesting
app.get('/api/videos', function(req, res){
  res.json({
    samples: [
      {
        _id: 1,
        name: "Camping",
        link: "/videos/camping.mp4",
      },{
        _id: 2,
        name: "Dog in Sunset",
        link: "/videos/dog_in_sunset.mp4",
      },{
        _id: 3,
        name: "Sunset",
        link: "/videos/underwater.mp4",
      },{
        _id: 4,
        name: "Underwater",
        link: "/videos/underwater.mp4",
      }
    ]
  });
});

/**********
 * SERVER *
 **********/

//
// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

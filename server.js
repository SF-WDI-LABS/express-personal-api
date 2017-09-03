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
          name: "name1",
        description: "description1"
        },{
          name: "name2",
          description: "description2"
        },{
          name: "name3",
          description: "description3"
        },{
          name: "name4",
          description: "description4"
        }],
    }
  })
});

// Api template for images
app.get('/api/images', function(req, res){
  res.json({
    background: [
        {
        _id:  1,
        name: "Beach",
        image_link: "/images/beach.jpg",
        },{
        _id:  2,
        name: "Snow Mountain",
        image_link: "/images/snowmountain.jpg",

        },{
        _id: 3,
        name: "Under Water",
        image_link: "/images/underwater.jpg",
        }, {
        _id: 4,
        name: "Mossholder",
        image_link: "/images/mossholder.jpg",
        }
      ]
  });
});

// Api template for videos
app.get('/api/videos', function(req, res){
  res.json({
    samples: [
      {
        _id: 1,
        name: "Camping",
        image_link: "/videos/camping.mp4",
      },{
        _id: 2,
        name: "Dog in Sunset",
        image_link: "/videos/dog_in_sunset.mp4",
      },{
        _id: 3,
        name: "Sunset",
        image_link: "/videos/underwater.mp4",
      },{
        _id: 4,
        name: "Underwater",
        image_link: "/videos/underwater.mp4",
      }
    ]
  });
});



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

//
// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

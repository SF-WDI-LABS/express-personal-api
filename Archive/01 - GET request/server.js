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
app.get('/api/profile', function apiIndex(req,res) {
  res.json({
    endpoints: [{
      name: "Carlynn Espinoza",
      githubUsername: "Carlynn",
      githubLink: "https://github.com/Carlynn",
      githubProfileImage: "https://avatars1.githubusercontent.com/u/29782639?v=4&s=460",
      personalSiteLink: "https://carlynn.github.io/",
      currentCity: "San Francisco",
      hobbies: [
        {
        optionOne: "Answer A",
        optionTwo: "Answer B",
        },
        {
          optionThree: "Answer C",
          optionFour: "Answer D",
        },
      ]
    }]
  });
});

app.get('/api', function apiIndex(req, res) {
  res.json({
    endpoints: [
      {
        name: "Oxford Social Club",
        location: "San Diego",
        website: "https://theoxfordsd.com/",
        image: "https://pbs.twimg.com/profile_images/745999186265399296/AgQFU1QA.jpg",
        notes: "Be Sophisticated or Don't",
      },
      {
        name: "The Bungalow",
        location: "Santa Monica",
        website: "http://www.thebungalow.com/",
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/F-f7YjOFDd9b5jKVmkE84Q/ls.jpg",
        notes: "Breezy, beachside Baja lifestyle",
      },
      {
        name: "The Battery",
        location: "San Francisco",
        website: "https://www.thebatterysf.com/club/",
        image: "https://qph.ec.quoracdn.net/main-thumb-t-453945-200-wcuvopxyeusrfhqagrthqdwyvviwbgol.jpeg",
        notes: "Diversity and intelligence with just a touch of the bizarre",
      },
    ]
  })
});


router.get("/", require("./controllers/index"));
// router.post("/", require("./controllers/create"));
// router.put("/:id", require("./controllers/update"));
// router.get("/:id/edit", require("./controllers/edit"));
// app.delete("/:id", require("./controllers/destroy"));

// app.get('/api', function apiIndex(req, res) {
//   // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
//   // It would be seriously overkill to save any of this to your database.
//   // But you should change almost every line of this response.
//   res.json({
//     woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
//     message: "Welcome to my personal api! Here's what you need to know!",
//     documentationUrl: "https://github.com/example-username/express-personal-api/README.md", // CHANGE ME
//     baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
//     endpoints: [
//       {method: "GET", path: "/api", description: "Describes all available endpoints"},
//       {method: "GET", path: "/api/profile", description: "pizza"}, // CHANGE ME
//       {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
//     ]
//   })
// });

/**********
* SERVER *
**********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

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

var controllers = require('./controllers');

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

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/conmart/express-personal-api/README.md",
    baseUrl: "http://still-earth-44555.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "A little information about me"},
      {method: "GET", path: "/api/boardgames", description: "An index of all the board games in the database in JSON format" },
      {method: "POST", path: "/api/newBoardgame", description: "Create a new board game"},
      {method: "PUT", path: "/api/boardgames/:id", description: "Update board game with passed id"},
      {method: "DELETE", path: "/api/boardgames/:id", description: "Delete board game with passed id"}
    ]
  })
});

app.get('/api/profile', function apiIndex(req, res) {
  res.json({
    name: "Connor Martinelli",
    githubUsername: "conmart",
    githubLink: "https://github.com/conmart",
    currentCity: "Oakland",
    pets: [
      {
        name: "Cookie",
        type: "Dog",
        breed: "Border Collie Mix (Mutt)",
      },
      {
        name: "Teka",
        type: "Cat",
        breed: "Awesome",
      },
      {
        name: "Pumpkin",
        type: "Cat",
        breed: "Orange Tabby",
      }
    ]
  })
})


app.get('/api/boardgames', controllers.boardgames.index);
app.post('/api/newBoardgame', controllers.boardgames.create);
app.put('/api/boardgames/:id', controllers.boardgames.update);
app.delete('/api/boardgames/:id', controllers.boardgames.destroy);
app.get('/api/boardgames/:id', controllers.boardgames.show);





/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

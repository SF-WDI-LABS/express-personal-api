// require express and other modules
var express = require('express'),
    app = express(),
    db = require('./models');

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

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to Younji's personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/younjiwoo/express-personal-api/README.md",
    baseUrl: "https://agile-inlet-98335.herokuapp.com", 
    endpoints: [
        {method: "GET", path: "/api", description: "Describes all available endpoints."},
        {method: "GET", path: "/api/profile", description: "Who I am and where I'm from."},
        {method: "GET", path: "/api/movies", description: "Index of all the movies I'd like to see."}, 
        {method: "POST", path: "/api/movies", description: "Create a new movie I'd like to see."},
        {method: "PUT", path: "/api/movies/:id", description: "Edit if made a typo, or gave a wrong movie title."},
        {method: "DELETE", path: "/api/movies/:id", description: "Destroy a movie."}
    ]
  })
});

// Profile.
app.get('/api/profile', function profile(req, res) {
    res.json({
        name: 'Younji Woo',
        githubUsername: 'younjiwoo',
        githubLink: 'https://github.com/younjiwoo',
        githubProfileImage: 'https://avatars0.githubusercontent.com/u/16580897?v=3&u=b837dc0be5f0efcf0acae8a79454dd239131411f&s=400',
        personalSiteLink: 'https://younjiwoo.github.io/',
        currentCity: 'San Mateo, California',
        pets: [{name: 'Casey', type: 'Dog', breed: 'German Shepherd and Collie'},
              {name: 'Mondu', type: 'Dog', breed: 'Samoyed'}]
    })
});


// Index: Get all movies.
app.get('/api/movies', function showMovies(req, res) {
    db.Movie.find({}).exec(function(err, movies) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send(movies);
    })
})

// Show.
app.get('/api/movies/:id', function showOneMovie(req, res) {
    db.Movie.findById(req.params.id)
        .exec(function(err, movie) {
        if (err) {
            res.sendStatus(404);
            return;
        }
        res.json(movie);
    })
})

// Create.
app.post('/api/movies', function addMovie(req, res) {
    console.log(req.body);
    db.Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        tomatoMeter: req.body.tomatoMeter,
        haveIseenIt: req.body.haveIseenIt,
        image: req.body.image
    }, function(err, movie) {
        if (err) {
            return console.log('This is a save err: ' + err);
        }
        console.log(movie.title, ' is saved! Yay!');
        // send back the movie.
        res.json(movie);
    });
})

// Update.

// Delete.

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000);

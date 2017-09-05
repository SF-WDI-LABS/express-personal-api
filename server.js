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
var Sammich = db.Sammich;

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

 app.get("/api/sammich", function index(req, res){
   Sammich.find({}, function(err, sammich){
     res.send(sammich); // all the sammiches
   });
 });

 app.get("/api/sammich/:id", function show(req, res){
   var id = req.params.id;
   Sammich.findOne({_id: id}, function(err, sammich){
     res.send(sammich); // one sammich
   });
 });

 app.post("/api/sammich", function create(req, res){
   var newSammich = new Sammich(req.body);
   newSammich.save(function(err, sammich){
     if(err) { res.sendStatus(404); }
     res.send(sammich);  // one newly created sammich
   });
 });

 app.delete("/api/sammich/:id", function destroy(req, res){
  console.log("sammich delete", req.params);
  var sammichId = req.params.id;
  db.Sammich.findOneAndRemove({_id: sammichId}, function (err, deletedSammich) {
    res.sendStatus(204);
  });
 });


 app.put("/api/sammich/:id", function update(req, res){
   res.send({}); // one updated sammich
 });

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

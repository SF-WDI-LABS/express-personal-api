/************
 * DATABASE *
 ************/

const db = require('../models');


// GET renderSearchResults => on load of the page what to be able to render the search results page which loads the 10 people in the database
  // append profileSRP from the SRP section
  // fill in the correct user information

// Function to send back everything
  // function searchResultsPage(req, res) {
  //   console.log('SRP is getting data')
  //   db.Profile.find({}, function(err, allProfiles) {
  //     res.json(allProfiles)
  //   })
  //   res.status(200)
  // };

// function that ONLY sends back ones that are NOT marked for delation
function searchResultsPage(req, res) {
  console.log('SRP is getting data')
  db.Profile.find({}, function(err, allProfiles) {
    let arrayOfProfilesToBeShown = [];
    let arrayOfProfilesMarkedForDeletion = [];
    allProfiles.forEach(function(profile) {
      if ( profile.markedForDeletion === false) {
        arrayOfProfilesToBeShown.push(profile);
      } else {
      arrayOfProfilesMarkedForDeletion.push(profile);
    }
    });
    res.json(arrayOfProfilesToBeShown)
    console.log('DONT SEND BACK', arrayOfProfilesMarkedForDeletion)
  })
};

// GET (SEND user ID) and renderProfile need to be able to click on a person, take that id and route them to a profile page

// app.get('/api/searchpage/:profileId', controllers.profile.showOneProfile);
function showOneProfile(req, res) {
  console.log('showOneProfile Route is getting hit', req.params.profileId)
  db.Profile.findById(req.params.profileId, function(err, foundProfile) {
    if (err) {
      console.log('showOneProfile in controller had an error', err);
    }
    // send back the Profile info the DB via json file
      res.json(foundProfile)
  })

};

// POST createNewUser => able to create a new user on the SRP and then render that new person
function createNewProfile(req, res) {

};



// PUT able to update the user on the renderProfile page (able to update each spot individually)

function updateOneProfile(req, res) {
  console.log('updateOneProfile Route is getting hit!!!', req.body)
  db.Profile.findByIdAndUpdate(req.params.profileId, {$set: {
    name: req.body.name,
    title: req.body.title,
    workPlace: req.body.workPlace,
    quote: req.body.quote,
  }}, {new: true}, function(err, saveProfile) {
    if (err) {
      console.log('THERE WAS AN ERROR DURING updateOneProfile Save', err);
    }
    console.log('updateOneProfile SAVED AND JSON IS SENT BACK', saveProfile);
    res.json(saveProfile)
  })
};

// DELETE / PUT able to 'hit the delete flag' and not show up the user anymore vs actually deleting their information

function deleteOneProfile(req, res) {

};

module.exports = {
  searchResultsPage: searchResultsPage,
  createNewProfile: createNewProfile,
  showOneProfile: showOneProfile,
  updateOneProfile: updateOneProfile,
  deleteOneProfile: deleteOneProfile
};

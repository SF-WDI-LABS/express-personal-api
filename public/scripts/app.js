console.log("Sanity Check: JS is working!");
var $placesList;
var allPlaces = [];
$(document).ready(function(){

// your code

$placesList = $('#target');

$.ajax({
  method: 'GET',
  url: '/api/profile',
  success: handleProfileSuccess,
  error: handleProfileError
});
  $.ajax({
    method: 'GET',
    url: '/api/places',
    success: handleSuccess,
    error: handleError
  });

  $('#newDestinationForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/places',
      data: $(this).serialize(),
      success: newPlaceSuccess,
      error: newPlaceError
    });
  });

  $placesList.on('click', '.deleteBtn', function(e) {
    e.preventDefault();
    console.log('clicked delete button to', '/api/places/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/places/'+$(this).attr('data-id'),
      success: deletePlaceSuccess,
      error: deletePlaceError
    });
  });

  $placesList.on('click', '.updateBtn', function() {
    console.log('clicked update button to', '/api/places/'+$(this).attr('data-id'));
    $.ajax({
      method: 'PUT',
      url: '/api/places/'+$(this).attr('data-id'),
      success: updatePlaceSuccess,
      error: updatePlaceError
    });
  });


  function getProfileHtml(profile) {
    console.log(profile);
    return `<div class="col-md-4">
      <img id="self" class="img-responsive" src="/images/me.png" alt="profile photo">
    </div>

  <div class="col-md-4 text-left">
    <h2> Career</h2>
    <p>${profile.career}</p>
    <h2> Education</h2>
    <p>Bachelors in Optical Engineering <br>
    Bachelors in Physics</p>
  </div>

  <div class="col-md-4 text-left">
    <h4> Available for:</h4>
    <p>Web Development <br>
      Data Analysis<br>
      Consulting
    </p>
  </div>
  <div class="col-md-4 text-left">
    <h4> Contact:</h4>
    <p>Cell : 650-307-8070 <br>
      E-mail : ${profile.email}<br>
    </p>
  </div>
  <div id="social" class="col-md-4"><h4>Social links:</h4>
    <a href="${profile.githubLink}" target="_blank"><img src="/images/github.png" alt="github logo"></a>
    <a href="${profile.linkedIn}" target="_blank"><img src="/images/linkedin.png" alt="linkedin logo"></a>
</div>`;
  }
  function getPlacesHtml(place) {
    console.log(place);
    return `<div class="card col-md-4">
            <img src="${place.image}" alt="${place.name}" class="img-responsive" data-toggle="modal" data-target="${place._id}">
            <h4 class="text-uppercase">${place.name}</h4>
            <div class="row">
            <div class="col-md-12">${place.description}</div>
            </div>
            <div class="footer">
            <button type="button" name="button" class="deleteBtn btn btn-default pull-right" data-id=${place._id}>Delete</button>
            <button type="button" name="button" class="updateBtn btn btn-default pull-right" data-id=${place._id}>Update</button>
            </div></div>`;
  }

  function getAllPlacesHtml(places) {
    return places.map(getPlacesHtml).join("");
  }
  function renderProfile() {
    $("#profile").append(getProfileHtml(profile));
  }
  function render() {
  // empty existing posts from view
  $placesList.empty();

  // pass `allBooks` into the template function
  var placesHtml = getAllPlacesHtml(allPlaces);

  // append html to the view
  $placesList.append(placesHtml);
};

function handleProfileSuccess(json) {
  console.log(json);
  profile = json;
  renderProfile();
}

function handleProfileError(e) {
  console.log('uh oh');
  $('#profile').text('Failed to load profile, is the server working?');
}
function handleSuccess(json) {
  console.log(json);
  allPlaces = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#target').text('Failed to load books, is the server working?');
}

});

function newPlaceSuccess(json) {
  $('#newDestinationForm input').val('');
  allPlaces.push(json);
  render();
}

function newPlaceError() {
  console.log('newplace error!');
}

function deletePlaceSuccess(json) {
  var place = json;
  console.log(json);
  var placeId = place._id;
  console.log('delete place', placeId);
  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allPlaces.length; index++) {
    if(allPlaces[index]._id === placeId) {
      allPlaces.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deletePlaceError() {
  console.log('deleteplace error!');
}

function updatePlaceSuccess(json) {
  var place = json;
  console.log(json);
  $('#newDestinationForm input').val('');
  var placeId = place._id;
  console.log('update place', placeId);
  // find the book with the correct ID and update it
  for(var index = 0; index < allPlaces.length; index++) {
    if(allPlaces[index]._id === placeId) {
      console.log(place);
      allPlaces[index].name = place.name;
      allPlaces[index].description = place.description;
      allPlaces[index].image = place.image;
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function updatePlaceError() {
  console.log('update place error!');
}

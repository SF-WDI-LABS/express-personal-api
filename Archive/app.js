console.log("Sanity Check: JS is working!");
var $venuesList;
var allVenues = [];

$(document).ready(function(){

  $venuesList = $('#venueTarget');
  $.ajax({
    method: 'GET',
    url: '/api/venues',
    success: handleSuccess,
    // error: handleError
  });

  // $('#venue-form').on('submit', function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/venues',
  //     data: $(this).serialize(),
  //     success: newVenueSuccess,
  //     // error: newBookError
  //   });
  // });
  //
  // $venuesList.on('click', '.deleteBtn', function() {
  //   console.log('clicked delete button to', '/api/venues/'+$(this).attr('data-id'));
  //   $.ajax({
  //     method: 'DELETE',
  //     url: '/api/venues/'+$(this).attr('data-id'),
  //     success: deleteVenueSuccess,
  //     // error: deleteBookError
  //   });
  // });

});

function getVenueHtml(venue) {
  return `
    <div class="container-fluid venue col-sm-6" data-venue-id="${venue._id}">
    <div class="panel panel-default">
    <div class="panel-body" style="background-image: url('${venue.imageBackground}'); background-repeat: no-repeat; background-size: 100% 100%">

    <!-- begin venue internal row -->
    <div class="row">
    <div class="col-sm-3 col-xs-12">
    <img class="img-responsive" src="${venue.image}" style="width: 200px" />
    </div>
    <div class="col-sm-9 col-xs-12" style="color:black">
    <ul class="list-group">
    <li class="list-group-item">
    <h4 class='inline-header'><b>Name: </b></h4>
    <span>${venue.name}</span>
    </li>
    <li class="list-group-item">
    <h4><b>Location: </b></h4>
    <span>${venue.location}</span>
    </li>
    <li class="list-group-item">
    <h4><b>Website: </b></h4>
    <span><a href="${venue.website}">${venue.website}</a></span>
    </li>
    <li class="list-group-item">
    <h4><b>Notes: </b></h4>
    <span class="venue-notes">${venue.notes}</span>
    </li>
    </ul>
    </div>
    </div>
    <!-- end of venue internal row -->
    <div class='panel-footer'>
    <button class='btn btn-info edit-venue tgl-btn' style="width: 150px">Edit Notes</button>
    <button class='btn btn-success save-venue hidden' style="width: 150px">Save Changes</button>
    <button class='btn btn-danger delete-song' style="width: 150px">Delete</button>
    </div>
    </div>
    </div>
    </div>
    <!-- end one venue -->
    `;
}

function getAllVenuesHtml(venues) {
  return venues.map(getVenueHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $venuesList.empty();

  // pass `allBooks` into the template function
  var venuesHtml = getAllVenuesHtml(allVenues);

  // append html to the view
  $venuesList.append(venuesHtml);
};

function handleSuccess(json) {
  allVenues = json;
  render();
}

// function handleError(e) {
//   console.log('uh oh');
//   $('#bookTarget').text('Failed to load books, is the server working?');
// }

function newVenueSuccess(json) {
  $('#venue-form').val('');
  allVenues.push(json);
  render();
}

// function newBookError() {
//   console.log('newbook error!');
// }

function deleteVenueSuccess(json) {
  var venue = json;
  console.log(json);
  var venueId = venue._id;
  console.log('delete venue', venueId);
  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allVenues.length; index++) {
    if(allVenues[index]._id === venueId) {
      allVenues.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

// function deleteBookError() {
//   console.log('deletebook error!');
// }

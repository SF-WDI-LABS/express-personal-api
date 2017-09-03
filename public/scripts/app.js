console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // your code
  //Create a variable to shorthand for the delete button section in the index.html
  // $venueList = $("#bookTarget");

  //Step 1, part 1 of 3:
  //GET the api information and show it through renderMultipleVenues shown later on the page
  $.ajax({
    url: '/api',
    success: renderMultipleVenues,
  });

  //Step 2, 1 of x: Create
  //Update the index.html
  $('#venue-form form').on('submit', function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api', formData, function(venue) {
      console.log('venue after POST', venue);
      renderVenue(venue);  //render the server's response
    });
    $(this).trigger("reset");
  });

  //Step 3a, 1 of 2: Edit
  $('#venues').on('click', '.edit-venue', handleEditVenueClick);
    //Step 3b, 1 of x: Save the Edits
  $('#venues').on('click', '.save-venue', handleSaveChangesClick);

  //   $.when.apply(null, deferred).always(function() {
  //     console.log('all updates sent and received, time to refresh!');
  //     console.log(arguments);
  //     fetchAndReRenderVenueWithId(venueId);
  //   });
  //
  // function fetchAndReRenderVenueWithId(venueId) {
  //   $.get('/api' + venueId, function(data) {
  //     // remove the current instance of the album from the page
  //     $('div[data-venue-id=' + venueId + ']').remove();
  //     // re-render it with the new album data (including songs)
  //     renderVenue(data);
  //   });
  // }

  //Step 3a, 2 of 2: Edit
  function handleEditVenueClick(event) {
    var $venueRow = $(this).closest('.venue');
    var venueId = $venueRow.data("venue-id");
    console.log('edit venue', venueId);
    // show the save changes button
    $venueRow.find('.save-venue').toggleClass('hidden');
    // hide the edit button
    $venueRow.find('.edit-venue').toggleClass('hidden');
    var venueNotes =
    $venueRow.find('span.venue-notes').text();
    $venueRow.find('span.venue-notes').html('<input class="edit-venue-notes" value="' + venueNotes + '"></input>');
  };

  //Step 3b, 2 of x: Save the edits
    //Saving changes from edits made
  function handleSaveChangesClick(event) {
    var venueId = $(this).parents('.venue').data('venue-id'); // $(this).closest would have worked fine too
    var $venueRow = $('[data-venue-id=' + venueId + ']');

    var data = {
      venueNotes: $venueRow.find('.edit-venue-notes').val()
    };
    console.log('PUTing data for venue', venueId, 'with data', data);

    $.ajax({
      method: 'PUT',
      url: '/api',
      data: data,
      success: handleVenueUpdatedResponse
    });
  }

  //Step 3b, 3 of x: Save the edits
  function handleVenueUpdatedResponse(data) {
    console.log('response to update', data);

    var venueId = data._id;
    // scratch this venue from the page
    $('[data-venue-id=' + venueId + ']').remove();
    renderVenue(data);

    $('[data-venue-id=' + venueId + ']')[0].scrollIntoView();
  }

  //Step 1, part 2 of 3:
  //This runs through the forEach loop. Each item in the api will be shown abd tge renderVenue will display this per the function below
  function renderMultipleVenues(venues) {
    venues.forEach(function(venue) {
      renderVenue(venue);
    });
  }

  //Step 1, part 3 of 3:
  function renderVenue(venue) {
    var venueHtml = (`
      <div class="row venue" data-venue-id="${venue._id}">
        <div class="col-md-10 col-md-offset-1">
          <div class="panel panel-default">
          <div class="panel-body">
      <!-- begin venue internal row -->
      <div class="row margin-top-20 wine-container" style="border: blue solid 2px">
        <div class="col-sm-3" class="img-responsive"/><img src="${venue.image}" style="width: 200px"/>
        </div>
      <div class="col-sm-9" style="border: pink solid 2px; color:black">
        <div class="margin-top-20">
          <span><b>Name: </b></span><span>${venue.name}</span>
        </div>
      <div>
        <span><b>Location: </b></span><span>${venue.location}</span>
      </div>
      <div>
        <span><b>Website: </b></span><span><a href="${venue.website}">${venue.website}</a></span>
      </div>
      <div>
        <span><b>Notes: </b></span><span class="venue-notes">${venue.notes}</span>
      </div>
        <div class="margin-top-10">
      </div>
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
    </div>
      <!-- end one venue -->
      `);
      $("#venues").prepend(venueHtml);
    }






  });

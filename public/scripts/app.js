console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // your code
  //Create a variable to shorthand for the delete button section in the index.html
  // $venueList = $("#bookTarget");

  //Step 1a, part 1 of 3:
  //GET the api information and show it through renderMultipleVenues shown later on the page
  $.ajax({
    url: '/api/venues',
    success: renderMultipleVenues,
  });

  //Step 1b, part 1 of 3:
  $.ajax({
    url: '/api/profile',
    success: renderMyProfile,
  });

  //Step 2, 1 of 1: Create
  //Update the index.html
  // $('#album-form form').on('submit', function(event) {
  //   event.preventDefault();
  //   var formData = $(this).serialize();
  //   console.log('formData', formData);
  //   $.post('/api/venues', formData, function(venue) {
  //     console.log('venue after POST', venue);
  //     renderVenue(venue);  //render the server's response
  //   });
  //   $(this).trigger("reset");
  // });

  //Step 3a, 1 of 2: Edit
  // $('#venues').on('click', '.edit-venue', handleEditVenueClick);
  // //Step 3b, 1 of x: Save the Edits
  // $('#venues').on('click', '.save-venue', handleSaveChangesClick);
  //Step 4, 1 of x: Delete
  $('#venues').on('click', '.delete-venue', handleDeleteVenueClick);

  //   $.when.apply(null, deferred).always(function() {
  //     console.log('all updates sent and received, time to refresh!');
  //     console.log(arguments);
  //     fetchAndReRenderVenueWithId(venueId);
  //   });
  //
  // function fetchAndReRenderVenueWithId(venueId) {
  //   $.get('/api/venues/' + venueId, function(data) {
  //     // remove the current instance of the venue from the page
  //     $('div[data-venue-id=' + venueId + ']').remove();
  //     // re-render it with the new venue data (including songs)
  //     renderVenue(data);
  //   });
  // }

  //Step 3a, 2 of 2: Edit
  // function handleEditVenueClick(event) {
  //   var $venueRow = $(this).closest('.venue');
  //   var venueId = $venueRow.data("venue-id");
  //   console.log('edit venue', venueId);
  //   // show the save changes button
  //   $venueRow.find('.save-venue').toggleClass('hidden');
  //   // hide the edit button
  //   $venueRow.find('.edit-venue').toggleClass('hidden');
  //   var venueNotes =
  //   $venueRow.find('span.venue-notes').text();
  //   $venueRow.find('span.venue-notes').html('<input class="edit-venue-notes" value="' + venueNotes + '"></input>');
  // };

  //Step 3b, 2 of x: Save the edits
  //Saving changes from edits made
  // function handleSaveChangesClick(event) {
  //   var venueId = $(this).parents('.venue').data('venue-id'); // $(this).closest would have worked fine too
  //   var $venueRow = $('[data-venue-id=' + venueId + ']');
  //   var data = {
  //     venueNotes: $venueRow.find('.edit-venue-notes').val()
  //   };
  //   console.log('PUTing data for venue', venueId, 'with data', data);
  //   $.ajax({
  //     method: 'PUT',
  //     url: '/api/venues/' + venueId,
  //     data: data,
  //     success: handleVenueUpdatedResponse
  //   });
  // }

  //Step 3b, 3 of x: Save the edits
  // function handleVenueUpdatedResponse(data) {
  //   console.log('response to update', data);
  //
  //   var venueId = data._id;
  //   // scratch this venue from the page
  //   $('[data-venue-id=' + venueId + ']').remove();
  //   renderVenue(data);
  //
  //   $('[data-venue-id=' + venueId + ']')[0].scrollIntoView();
  // }

  //Step 1a, 2 of 3:
  //This runs through the forEach loop. Each item in the api will be shown and the renderVenue will display this per the function below
  function renderMultipleVenues(venues) {
    venues.forEach(function(venue) {
      renderVenue(venue);
    });
  }
  //Step 1b, 2 of 3:
  function renderMyProfile(profiles) {
    profiles.forEach(function(profile) {
      renderProfile(profile);
    });
  }

  // Step 4, 2 of x: Delete
  // when a delete button for an venue is clicked
  // function handleDeleteVenueClick(event) {
  //   var venueId = $(this).parents('.venue').data('venue-id');
  //   console.log('someone wants to delete venue id=' + venueId );
  //   $.ajax({
  //     url: '/api/venues/' + venueId,
  //     method: 'DELETE',
  //     success: handleDeleteVenueSuccess
  //   });
  //   console.log("passed the AJAX")
  // }

  // Delete story from db and from front-end rendering
    function handleDeleteVenueClick(event) {
      var venueId = $(this).parents('.venue').data('venue-id');
      console.log('someone wants to delete venue id=' + venueId );
        $.ajax({
            method: "delete",
            url: "/api/venues/" + venueId,
        }).then(function(data){
            venueId.remove();
        });
    };
  //Step 4, 3 of x: Delete
  // callback after DELETE /api/venue/:id
//   function handleDeleteVenueSuccess(data) {
//     var deletedVenueId = data._id;
//     $('div[data-venue-id=' + deletedVenueId + ']').remove();
//   }
// console.log(deletedVenueId);
  //Step 1a, part 3 of 3:
  function renderVenue(venue) {
    var venueHtml = (`
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
      <button class='btn btn-danger delete-venue' style="width: 150px">Delete</button>
      </div>
      </div>
      </div>
      </div>
      <!-- end one venue -->
      `);
      $("#venues").prepend(venueHtml);
    };

    //Step 1b, part 3 of 3:
    function renderProfile(profile) {
      var profileHtml = (`
        <h3>About the Author</h3>
        <div class="footer-row">
        <div class="col-sm-2">
        <img src="https://avatars1.githubusercontent.com/u/29782639?v=4&s=460" class="img-responsive" style="width: 100px"/>
        </div>
        <div class="col-sm-10" style="border: pink solid 2px">
        <div class="margin-top-20">
        <div>
        <span class="bold">Name: </span><span class="standard">${profile.name}</span>
        </div>
        <div>
        <span class="bold">Github Username: </span><span class="standard">${profile.githubUsername}</span>
        </div>
        <div>
        <span class="bold">Github Link: </span><span class="standard"><a href="${profile.githubLink}">${profile.githubLink}</a></span>
        </div>
        <div>
        <span class="bold">Personal Site Link: </span><span class="standard"><a href="${profile.personalSiteLink}">${profile.personalSiteLink}</a></span>
        </div>
        <div>
        <span class="bold">Current City: </span><span class="standard">${profile.currentCity}</span>
        </div>
        <div>
        <span class="bold">Hobbies: </span><span class="standard">test</span>
        </div>
        </div>
        </div>
        </div>
        `)
        $("#profiles").prepend(profileHtml);
      };




    });

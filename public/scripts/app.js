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
  $('#venue-form form').on('submit', function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/albums', formData, function(album) {
      console.log('album after POST', album);
      renderAlbum(album);  //render the server's response
    });
    $(this).trigger("reset");
  });

  // var venuebody = {
  //   name: $(this).parents('.panel-body').find('.venue-name').text(),
  //   location:
  //   $(this).parents('.panel-body').find('.venue-location').text(),
  //   website:
  //   $(this).parents('.panel-body').find('.venue-website').text(),
  //   image:
  //   $(this).parents('.panel-body').find('.venue-html').text(),
  //   notes:
  //   $(this).parents('.panel-body').find('.venue-notes').text(),
  // };

  //Step 1, part 2 of 3:
    //This runs through the forEach loop. Each item in the api will be shown abd tge renderVenue will display this per the function below
  function renderMultipleVenues(venues) {
    venues.forEach(function(venue) {
      renderVenue(venue);
    });
  }

  //Step 1, part 3 of 3:
  function renderVenue(venue) {
    console.log("rendering venue", venue);
    var venueHtml = (`
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
      <span><b>Notes: </b></span><span>${venue.notes}</span>
      </div>
      <div class="margin-top-10">
      </div>
      </div>
      </div>
      <!-- end of album internal row -->
      <div class='panel-footer'>
      <button class='btn btn-info edit-venue tgl-btn' style="width: 150px">Edit Venue</button>
      <button class='btn btn-danger delete-song' style="width: 150px">Delete</button>
      </div>
      <!-- end one album -->
      `);
      $("#venues").prepend(venueHtml);
    }






  });

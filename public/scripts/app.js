console.log("Sanity Check: JS is working!");
var $nationalparks;
var allParks = [];

$(document).ready(function(){
  // your code

  $nationalparks = $('#parksTarget');
  $.ajax({
    method: 'GET',
    url: '/api/nationalparks',
    success: handleSuccess,
    error: handleError
  });

  $('#newNationalparksForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/nationalparks',
      data: $(this).serialize(),
      success: newParkSuccess,
      error: newParkError
    });
  });

  $nationalparks.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/nationalparks/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/nationalparks/'+$(this).attr('data-id'),
      success: deleteParkSuccess,
      error: deleteParkError
    });
  });

});

function getNationalparksHtml(park) {
  return `<hr>
          <p>
            <b>${park.name}</b>
            in ${park.location}
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${park._id}>Delete</button>
          </p>`;
}

function getAllNationalparksHtml(parks) {
  return parks.map(getNationalparksHtml).join("");
}

//function to renter all posts to view
function render() {
  //empty existing posts from view
  $nationalparks.empty();

  //pass 'allParks' into template function
  var parksHtml = getAllNationalparksHtml(allParks);

  //append html to view
  $nationalparks.append(parksHtml);
};

function handleSuccess(json) {
  allParks = json;
  render();
}

function handleError(e) {
  console.log('oops');
  $('#parksTarget').text('Failed to load parks, is server working?')
}

function newParkSuccess(json) {
  $('#newNationalparksForm input').val('');
  allParks.push(json);
  render();
}

function newParkError() {
  console.log('newpark error!');
}

function deleteParkSuccess(json) {
  var park = json;
  console.log(json);
  var parkId = park._id;
  console.log('delete park', parkId);
  for(var index = 0; index < allParks.length; index++) {
    if(allParks[index]._id === parkId) {
      allParks.splice(index, 1);
      break;
    }
  }
  render();
}

function deleteParkError() {
  console.log('deleteParkError');
}

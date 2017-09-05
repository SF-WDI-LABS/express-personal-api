console.log('Sanity Check');

function renderCliffs(cliffs) {
  for (let i = 0; i < cliffs.length; i++) {
    renderCliff(cliffs[i]);
  };
  $('.updateButton').on("click", function (e) {
      console.log('Update button clicked');
      var currentCliffId = $(this).closest('.cliff').data('cliff-id');
      console.log(currentCliffId);
      $(this).closest('.cliff').find(".cliff-info").toggle();
      $(this).closest('.cliff').find(".update-info").toggle();
  });
  $('.input-info').on("submit", function (e) {
      console.log('save button clicked');
      var currentCliffId = $(this).find('.cliff').data('cliff-id');
      console.log(currentCliffId);
      handleUpdate(e, currentCliffId, this);
  });
  $('.deleteCliff').on("click", function (e) {
    console.log('delete button clicked');
    var currentCliffId = $(this).closest('.cliff').data('cliff-id');
    handleDeleteCliff(e, currentCliffId);
  });
}

function handleUpdate(e, id, form) {
  e.preventDefault();
  console.log(form);
  console.log($(form).serialize());
  $.ajax({
    method: "PUT",
    url: '/api/cliffs/' + id,
    data: $(form).serialize(),
    success: function() {
      window.location = '/'
    },
    error: handleError
  })
}
function handleDeleteCliff(e, id) {
  e.preventDefault();
  var currentDeleteId = $(this).closest('.cliff').data('cliff-id');
  console.log(currentDeleteId);
  $.ajax({
    method: 'DELETE',
    url: '/api/cliffs/' + id,
    success: function() {
      window.location = '/'
    },
    error: handleError
  })
}
function handleError(err){
  console.log('There has been an error: ', err);
}
$(document).ready(function() {
  console.log('app.js loaded!');
  $.ajax({
    method: 'GET',
    url: '/api/cliffs',
    success: renderCliffs,
    error: handleError
  });
  $('#singlebutton').on("submit", function(event) {
    console.log('in singlebutton submit');
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      method: 'POST',
      url: 'api/cliffs',
      data: $(this).serialize(),
      success: function() {
        window.location = '/'
      },
      error: handleError
    })
  });
});
// this function takes a single cliff and renders it to the page
function renderCliff(cliff) {
  var myCliffs = (`
  <form class="input-info">
  <div class="row cliff" data-cliff-id="${cliff._id}">

  <div class="col-md-10 col-md-offset-1">
  <div class="panel panel-default">
  <div class="panel-body">


  <!-- begin cliff internal row -->
  <div class='row'>
  <div class="col-md-3 col-xs-12 thumbnail cliff-art">
  <img src="https://i.ytimg.com/vi/lPx1OShpzoU/maxresdefault.jpg" alt="cliff image">
  </div>

  <div class="col-md-9 col-xs-12">
  <ul class="list-group">
  <li class="list-group-item">
  <h4 class='inline-header'>Cliff Name:</h4>
  <span class='cliff-name cliff-info'>${cliff.name}</span>
  <input name="cliffName" type="text" class="update-info" value="${cliff.name}">
  </li>

  <li class="list-group-item">
  <h4 class='inline-header'>Nearest City:</h4>
  <span class='nearest-city cliff-info'>${cliff.nearestCity}</span>
  <input name="nearestCity" type="text" class="update-info" value="${cliff.nearestCity}">
  </li>

  <li class="list-group-item">
  <h4 class='inline-header'>GPS Coordinates:</h4>
  <span class='cliff-gps cliff-info'>${cliff.gpsCoords}</span>
  <input name="gpsCoords" type="text" class="update-info" value="${cliff.gpsCoords}">
  </li>

  <li class="list-group-item">
  <h4 class='inline-header'>Height:</h4>
  <span class='cliff-height cliff-info'>${cliff.height}</span>
  <input name="height" type="text" class="update-info" value="${cliff.height}">
  </li>

  <li class="list-group-item">
  <h4 class='inline-header'>Accessibility:</h4>
  <span class='cliff-access cliff-info'>${cliff.accessibility}</span>
  <input name="accessibility" text" class="update-info" value="${cliff.accessibility}">
  </li>
  <li class="list-group-item">
  <h4 class="inline-header">Description:</h4>
  <span class="description-cliff cliff-info">${cliff.description}</span>
  <input name="description" type="text" class="update-info" value="${cliff.description}"type="text" >
  </li>
  </ul>
  </div>

  </div>
  <!-- end of cliff internal row -->

  <div class='panel-footer'>
  <button class="deleteCliff btn btn-danger" name="singlebutton1">Delete</button>
  <button type="button" class="updateButton cliff-info btn btn-secondary" name="singlebutton2">Update</button>
  <button class="saveChangeButton update-info btn btn-info" name="singlebutton2">Save Changes</button>
  </div>
  </div>
  </div>
  </div>
  </div>
  </form>`)
  $('#cliffs').append(myCliffs);
};

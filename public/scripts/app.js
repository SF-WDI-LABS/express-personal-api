console.log('Sanity Check');

function renderCliffs(cliffs) {
  for (let i = 0; i < cliffs.length; i++) {
    renderCliff(cliff[i]);
  };
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
      success: renderAlbum,
      error: handleError
    })
  });
});

// this function takes a single album and renders it to the page
function renderAlbum(cliff) {
  console.log('rendering cliff:', cliff);
  var myCliffs = (`
  <div class="row cliff" data-cliff-id="${cliff._id}">

  <div class="col-md-10 col-md-offset-1">
  <div class="panel panel-default">
  <div class="panel-body">


  <!-- begin cliff internal row -->
  <div class='row'>
  <div class="col-md-3 col-xs-12 thumbnail cliff-art">
  <img src="/images/800x800.png" alt="cliff image">
  </div>

  <div class="col-md-9 col-xs-12">
  <ul class="list-group">
  <li class="list-group-item">
  <h4 class='inline-header'>Cliff Name:</h4>
  <span class='cliff-name'>${cliff.name}</span>
  </li>

  <li class="list-group-item">
  <h4 class='inline-header'>Nearest City:</h4>
  <span class='nearest-city'>${cliff.nearestCity}</span>
  </li>

  <li class="list-group-item">
  <h4 class='inline-header'>GPS Coordinates:</h4>
  <span class='cliff-gps'>${cliff.gpsCoords}</span>
  </li>

  <li class="list-group-item">
  <h4 class='inline-header'>Height:</h4>
  <span class='cliff-height'>${cliff.height}</span>
  </li>

  <li class="list-group-item">
  <h4 class='inline-header'>Accessibility:</h4>
  <span class='cliff-access'>${cliff.accessibility}</span>
  </li>
  <li class="list-group-item">
  <h4 class="inline-header">Description:</h4>
  <span>'description-cliff'>${cliff.description}</span>
  </li>
  </ul>
  </div>

  </div>
  <!-- end of cliff internal row -->

  <div class='panel-footer'>
  </div>

  </div>
  </div>
  </div>
  </div>
  `)
  $('#cliffs').append(myCliffs);
};

console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  console.log('app.js is loaded!');
  $.ajax({
    method: 'GET',
    url: '/api/motorcycleList',
    success: renderMultipleMotorcycles
  });
});

function renderMultipleMotorcycles(motorcycleList) {
  motorcycleList.forEach(function(motorcycle) {
    renderList(motorcycle);
  });
}

// this function takes a single album and renders it to the page
function renderList(motorcycle) {
  console.log('rendering motorcycles', motorcycle);
  var motorcycleHtml = (`
    <div class="row album">
      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">
          <!-- begin album internal row -->
            <div class='row'>
              <div class="col-md-3 col-xs-12 thumbnail album-art">
                <img src="images/800x800.png" alt="album image">
              </div>
              <div class="col-md-9 col-xs-12">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class='inline-header'>Album Name:</h4>
                    <span class='album-name'>${motorcycle.name}</span>
                  </li>
                  <li class="list-group-item">
                    <h4 class='inline-header'>Artist Name:</h4>
                    <span class='artist-name'>${motorcycle.artistName}</span>
                  </li>
                  <li class="list-group-item">
                    <h4 class='inline-header'>Released date:</h4>
                    <span class='album-releaseDate'>${motorcycle.releaseDate}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- end of album internal row -->
            <div class='panel-footer'>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end one album -->
  `);
  $('#albums').prepend(motorcycleHtml);
}


//this function takes a single motorcycle and renders it to the page
function renderMotorcycle(list) {
  console.log('rendering list', list);
}

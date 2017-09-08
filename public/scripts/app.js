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
    <div class="row album" data-album-id="${motorcycle._id}">

      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">


          <!-- begin album internal row -->
            <div class='row'>
              <div class="col-md-3 col-xs-12 thumbnail album-art">
                <img src="../images" alt="Motorcycle Image">
              </div>
              <div class="col-md-9 col-xs-12">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class='inline-header'>Make:</h4>
                    <span class='motorcycle-name'>${motorcycle.make}</span>
                  </li>
                  <li class="list-group-item">
                    <h4 class='inline-header'>Model:</h4>
                    <span class='model-name'>${motorcycle.model}</span>
                  </li>
                  <li class="list-group-item">
                    <h4 class='inline-header'>Weight:</h4>
                    <span class='releaseDate'>${motorcycle.weight}</span>
                  </li>
                  <li class="list-group-item">
                    <h4 class='inline-header'>maxPower:</h4>
                    <span class='releaseDate'>${motorcycle.maxPower}</span>
                  </li>
                  <li class="list-group-item">
                    <h4 class='inline-header'>maxTorque:</h4>
                    <span class='releaseDate'>${motorcycle.maxTorque}</span>
                  </li>
                  <li class="list-group-item">
                    <h4 class='inline-header'>Engine Displacement:</h4>
                    <span class='releaseDate'>${motorcycle.engineDisplacement}</span>
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
  $('#motorcycleList').prepend(motorcycleHtml);
}


//this function takes a single motorcycle and renders it to the page
function renderMotorcycle(list) {
  console.log('rendering list', list);
}

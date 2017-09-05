console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// Render data to HTML function
$.ajax({
	method:"GET",
	url: '/api/motorcycleList',
	success: renderMultipleReviews
});

function formData(e){
  e.preventDefault();
  var formData = $(this).serialize();
  console.log('formData', formData);
 $.post('/api/motorcycleList', formData).done(renderMultipleReviews);
  window.location = window.location;
}

// form submission event handler
$('.form-horizontal').on('submit', formData)


});

// Here we loop through the data and render to HTML
function renderMultipleReviews(reviews) {

  reviews.forEach(function(review) {
    console.log(review)
  renderMotorcycle(review);
  });

}

// data render to html function
function renderMotorcycle(motorcycle) {


  var motorcycleHtml = (`
    <section id='album-form' class="container">
      <div class="row">
      <div class="col-md-10 col-md-offset-1">

        <form class="form-horizontal" id="singlebutton">
          <fieldset>

            <!-- Form Name -->
            <legend>Add New Motorcycle</legend>

            <!-- Text input-->
            <div class="form-group">
              <label class="col-md-4 control-label" for="make">Make:</label>
              <div class="col-md-4">
              <input id="name" name="name" type="text" placeholder="" class="form-control input-md" required="">

              </div>
            </div>

            <!-- Text input-->
            <div class="form-group">
              <label class="col-md-4 control-label" for="model">Model:</label>
              <div class="col-md-4">
              <input id="model" name="model" type="text" placeholder="" class="form-control input-md">

              </div>
            </div>

            <!-- Text input-->
            <div class="form-group">
              <label class="col-md-4 control-label" for="releaseDate">Release Date:</label>
              <div class="col-md-4">
              <input id="releaseDate" name="releaseDate" type="text" placeholder="1992" class="form-control input-md">
              </div>
            </div>

            <!-- Text input-->
            <div class="form-group">
              <label class="col-md-4 control-label" for="weight">Weight:</label>
              <div class="col-md-4">
              <input id="weight" name="weightName" type="text" placeholder="" class="form-control input-md">
              </div>
            </div>

            <!-- Text input-->
            <div class="form-group">
              <label class="col-md-4 control-label" for="">Max Power:</label>
              <div class="col-md-4">
              <input id="maxPower" name="maxPower" type="text" placeholder="" class="form-control input-md">
              </div>
            </div>

            <!-- Text input-->
            <div class="form-group">
              <label class="col-md-4 control-label" for="weight">Max Torque:</label>
              <div class="col-md-4">
              <input id="maxTorque" name="maxTorque" type="text" placeholder="" class="form-control input-md">
              </div>
            </div>

            <!-- Textarea -->
            <div class="form-group">
              <label class="col-md-4 control-label" for="engineDisplacement">Engine Displacement (Cylinder Capacity or Cubic Centimeters):</label>
              <div class="col-md-4">
                <textarea class="form-control" id="engineDisplacement" name="engine displacement">for ex, 999cc</textarea>
              </div>
            </div>


            <!-- Button -->
            <div class="form-group">
              <label class="col-md-4 control-label" for="singlebutton">Save Motorcycle</label>
              <div class="col-md-4">
                <button id="submitbutton" name="singlebutton" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      </div>
    </section>


  `);

// append to div
  $('#gymDisplay').prepend(motorcycleHtml);
}

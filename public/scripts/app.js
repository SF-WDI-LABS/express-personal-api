console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// your code
$('#add-dir-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    // $.post('/director', formData, function(director) {
    //   console.log('director after POST', director);
    //     //render the server's response
    // });
    // $(this).trigger("reset");
  });
});




function renderDirector(director) {
  console.log("rendering", director)
  var directorHtml= (`
    <div class="row director">

      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">


          <!-- begin director internal row -->
            <div class='row'>
              <div class="col-md-9 col-xs-12">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class='inline-header'>Director's Name:</h4>
                    <span class='name'>${director.name}</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Country of Origin:</h4>
                    <span class='country-of-origin'>${director.countryOfOrigin}</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Alive:</h4>
                    <span class='alive'>${director.alive}</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Movies Directed:</h4>
                    <span class='movies-directed'>
                      ${director.movieTitles}
                    </span>
                  </li>

                </ul>
              </div>
            </div>
            <!-- end of director internal row -->

          </div>
        </div>
      </div>
    </div>
  `)
}

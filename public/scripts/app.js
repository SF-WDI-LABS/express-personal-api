console.log("Sanity Check: JS is working!");

$(document).ready(function(){
console.log('Document ready.')

//populate page on load
$.ajax({
  method: 'GET',
  url: '/director',
  success: loadDirectors,
});

//add new director
$('#add-dir-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
     $.post('/director', formData, function(director) {
       console.log('director after POST', director);
         //render the server's response
    });
    window.location.reload()
  });

//deletes director
$('#directors').on('click', '.delete-dir-btn', deleteClick)

//toggle between display and edit form
$('#directors').on('click', '.edit-dir-btn', editClick)

//update director info
$('.edit-dir-form form').on('submit', function(e) {
    var directorId = $(this).parents('.director').data('id');
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
  });

// end of document ready
});

//function to toggle between display and edit form
function editClick(e){
  var directorId = $(this).parents('.director').data('id');
  var $directorRow = $(this).closest('.director');
  console.log(directorId)
  //toggle buttons
  $directorRow.find('.edit-dir-btn').toggleClass('hidden');
  $directorRow.find('.save-edit-btn').toggleClass('hidden');
  $directorRow.find('.list-group').toggleClass('hidden');
  $directorRow.find('.list-edit').toggleClass('hidden');

}
//funciton to save updates
// function saveClick(){
//
//
//   $.ajax({
//     url: '/director/' + directorId,
//     method: 'PUT',
//     //success: window.location.reload(),
//   })
// }

//function to delete
function deleteClick(e){
  var directorId = $(this).parents('.director').data('id');
 console.log(directorId)
  $.ajax({
    url: '/director/' + directorId,
    method: 'DELETE',
    success: window.location.reload(),
  })

}

//function to populate page on load
function loadDirectors(director){
  director.forEach(function(director){
    renderDirector(director)
  });
}

//formate for director render
//also includes hidden form and buttons for edit
function renderDirector(director) {
  console.log("rendering", director)
  var directorHtml = (`
  <section id="edit-dir-form" class="container">
    <div class="row director" data-id="${director._id}" >

      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">


          <!-- begin director internal row -->
            <div class='row'>
              <div class="col-md-12 col-xs-12">
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
                <section class="edit-dir-form container">
                <form>
                <ul class="list-edit hidden">
                  <li class="list-group-item">
                    <h4 class='inline-header'>Director's Name:</h4>
                    <input type='text' name='name' value='${director.name}'>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Country of Origin:</h4>
                    <input type='text' name='countryOfOrigin' value='${director.countryOfOrigin}'>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Alive:</h4>
                    <input type='text' name='alive' value='${director.alive}'>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Movies Directed: (Seperated by commas)</h4>
                    <textarea name="movieTitles">${director.movieTitles}</textarea>
                  </li>

                </ul>

                <button class="btn btn-primary save-edit-btn hidden" type="submit" >Save</button>
                </form>
                <button class="btn btn-primary edit-dir-btn" type="submit" >Edit</button>
                <button class="btn btn-primary  delete-dir-btn" type="submit">Delete</button>

              </div>
            </div>
            <!-- end of director internal row -->

          </div>
        </div>
      </div>
    </div>
    </section>
  `)
  $('#directors').append(directorHtml);
}

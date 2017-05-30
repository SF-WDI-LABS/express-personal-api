
// declare globals
var $body, $main;
var updateID;         // used to temporarily hold the id of the stairway that should be updated on save
var stairways = [];   // array to hold all stairway objects
var formMode;         // string to temporarily hold action to perform on Save button click - either Add/Post or Update/Put
var breadcrumb;       // string to keep track of page that was previously on


$(document).ready(function(){

  // get references to the div elements
  $body = $('body');
  $main = $('#main');

  // load the default home page content on page load
  showHomePage();

  $body.on("click", ".api-docs", showAPIDocs);

  // display the home page when the user clicks on the home page
  $body.on("click", ".btnHome", showHomePage);

  // display all the stairways
  $body.on("click", ".btnDisplayAll", displayAllStairways);

  // search for stairways based on the name
  $body.on("click", ".btnSubmitSearch", searchStairways);

  // display the form for adding a new stairway when the navbar Add button is clicked
  $body.on("click", ".btnAdd", showFormForAdd);

  // save new stairway or updated stairway
  $main.on("click", ".btnSave", saveStairway);

  // hide the form if the user cancels out of the form
  $main.on("click", ".btnCancel", hideForm);

  // call the function to delete the stairway with the id that was clicked on
  $main.on("click", ".btnDelete", function() {
    deleteStairway($(this).attr('data-id'));
  });

  // call the function to update the stairway with the id that was clicked on
  $main.on("click", ".btnUpdate", function() {
    showFormForUpdate($(this).attr('data-id'));
  });

});




function showHomePage() {

  // empty the contents of the main container div
  $(".main-container").empty();

  // get the new html to insert
  var html = getHomeHTML();

  // append the html to the main container div
  $(".main-container").append(html);

  // track page
  breadcrumb = "home page";

  // make sure the scrollbar is at the top of the page
  $('html,body').scrollTop(0);

}


function showAPIDocs() {

  $.ajax({
    method: 'GET',
    url: '/api',
    success: function(json) {

      // empty the contents of the main container div
      $(".main-container").empty();

      // append the html to the main container div
      $(".main-container").append(JSON.stringify(json));

    },
    error: function() {

    }
  });


}



function searchStairways() {

  alert("Sorry, the search feature is not ready yet.");

}



// display the bootstrap form for add or update
function showFormForAdd() {

  // empty the contents of the main container div
  $(".main-container").empty();

  // get the new html to insert
  var html = getFormHTML();

  // append the html to the main container div
  $(".main-container").append(html);

  // set the form mode variable
  formMode = "add";

  // make sure the scrollbar is at the top of the page
  $('html,body').scrollTop(0);

}


// hide the form
function hideForm() {

  if (breadcrumb === "home page") {
    showHomePage();
  } else if (breadcrumb === "results page") {
    displayAllStairways();
  }

  // make sure the scrollbar is at the top of the page
  $('html,body').scrollTop(0);

}


// called when the save button is clicked in the form - either an add or an update
function saveStairway() {

  if (formMode === "add") {
    addStairway();
  } else if (formMode === "update") {
    updateStairway();
  }

}


function addStairway() {

  $.ajax({
    method: 'POST',
    url: '/api/stairways',
    data: {
      name: $("#txtName").val(),
      description: $("#txtDescription").val(),
      neighborhood: $("#txtNeighborhood").val(),
      photoURL: $("#txtPhoto").val(),
      numSteps: $("#txtNumSteps").val(),
      rating: $("#inlineFormCustomSelect").val(),
      difficulty: $("#optDifficulty input:radio:checked").val(),
      favorite: $("#chkFavorite").val()
    },
    success: function(json) {

      // add the returned json object (from the database, including _id), to the stairways array
      stairways.push(json);

      // filter the array down to only the stairway object that was just added
      var stairway = stairways.filter(function(element, index) {
        return element._id === json._id;
      });

      // display all stairways
      displayAllStairways();

    },
    error: function() {


    }

  });


}


function updateStairway() {

  $.ajax({
    method: 'PUT',
    url: '/api/stairways/'+updateID,
    data: {
      name: $("#txtName").val(),
      description: $("#txtDescription").val(),
      neighborhood: $("#txtNeighborhood").val(),
      photoURL: $("#txtPhoto").val(),
      numSteps: $("#txtNumSteps").val(),
      rating: $("#inlineFormCustomSelect").val(),
      difficulty: $("#optDifficulty input:radio:checked").val(),
      favorite: $("#chkFavorite").val()
    },
    success: function(json) {

      // display all stairways
      displayAllStairways();

    },
    error: function() {

    }

  });


}


function displayAllStairways() {

  $.ajax({
    method: 'GET',
    url: '/api/stairways',
    success: function(json) {

      // empty the global array
      stairways = [];

      // push each database object into the array
      json.forEach(function(element,index) {
        stairways.push(element);
      })

      // display the results
      displayStairways(stairways);

    },
    error: function() {

    }
  });

}


function displayStairways(arr) {

  // build the html string that will be appended to the main container div
  var html = "";
  arr.forEach(function(element,index) {
    html = html + getResultHTML(element);
  });

  // empty the contents of the main container div
  $(".main-container").empty();

  // append the html to the main container div
  $(".main-container").append(html);

  // track page
  breadcrumb = "results page";

  // make sure the scrollbar is at the top of the page
  $('html,body').scrollTop(0);

}



function deleteStairway(id) {
  $.ajax({
    method: 'DELETE',
    url: '/api/stairways/'+id,
    success: function(json) {

      // empty the contents of the main container div
      $(".main-container").empty();

      // build the html that will be appended
      var html = `<div class='message-delete-success'>The '${json.name}' has been successfully deleted.</div>`;

      // append the html to the main container div
      $(".main-container").append(html);

    },
    error: function() {


    }
  });

}


function showFormForUpdate(id) {

  // get the specific stairway object from the array based on the id
  var stairway = stairways.filter(function(element, index) {
    return element._id === id;
  })[0];

  // empty the contents of the main container div
  $(".main-container").empty();

  // get the new html to insert
  var html = getFormHTML();

  // append the html to the main container div
  $(".main-container").append(html);

  // set the form mode variable
  formMode = "update";

  // make sure the scrollbar is at the top of the page
  $('html,body').scrollTop(0);

  // set the global id variable
  updateID = id;

  // populate the form
  $("#txtName").val(stairway.name);
  $("#txtDescription").val(stairway.description);
  $("#txtNeighborhood").val(stairway.neighborhood);
  $("#txtPhoto").val(stairway.photoURL);
  $("#txtNumSteps").val(stairway.numSteps);

}



// FUNCTIONS RETURNING HTML STRINGS
// --------------------------------

// html for home page
function getHomeHTML() {

  var html = `
    <a href="#" class='api-docs'>API Docs</a>
    <div class='intro'>
      <p class='title'>San Francisco Public Stairways</p>
      <p>Stairways are cool.  Whenever I discover a new one I feel compelled to take it, for reasons that aren’t always clear.  I suppose they offer different things: an easier way to climb a hill, a shortcut, an chance to get your heart racing, a way to get your bearings, a portal to a new street or neighborhood that you haven’t seen before.  Many have spectacular views from the top on a clear day.  Some have beautiful gardens intertwined.  A couple even have slides running parallel that you can chute down - how cool is that? </p>
      <p>Reportedly there are over 600 stairways in San Francisco.  If you know of one that is not included here and would like to add it, please go ahead, and don’t forget to link to a photo!</p>
    </div>

    <div class='image-container'>
      <img class='home-image' src='../images/moraga_steps_home.jpg'>
    </div>
  `

  return html;

}


// html for input form for add/update
function getFormHTML() {

  var html = `
    <div class='col-md-6 col-md-offset-3 input-form'>
      <div class='inner-form-container'>
        <form class='main-form'>

          <div class='form-group'>
            <label for='txtName'>Name</label>
            <input type='text' class='form-control' id='txtName' placeholder='Enter staircase name' maxlength='40'>
          </div>

          <div class='form-group'>
            <label for='txtDescription'>Description</label>
            <textarea class='form-control' id='txtDescription' rows='5' placeholder='Enter description' maxlength='600'></textarea>
          </div>

          <div class='form-group'>
            <label for='txtNeighborhood'>Neighborhood</label>
            <input type='text' class='form-control' id='txtNeighborhood' placeholder='Enter neighborhood' maxlength='80'>
          </div>

          <div class='form-group'>
            <label for='txtPhoto'>Link to Photo</label>
            <input type='text' class='form-control' id='txtPhoto' placeholder='Enter URL' maxlength='120'>
          </div>

          <div class='form-group'>
            <label for='txtNumSteps'>Number of Steps</label>
            <input type='number' class='form-control' id='txtNumSteps' placeholder='Enter number of steps'>
          </div>

          <label class='mr-sm-2' for='inlineFormCustomSelect'>Rating</label>
          <select class='custom-select mb-2 mr-sm-2 mb-sm-0' id='inlineFormCustomSelect'>
            <option selected>Select Rating</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>

          <p></p>

          <fieldset class='form-group form-check-inline' id='optDifficulty'>
            <label>Difficulty</label>
            <div class='form-check form-check-inline'>
              <label class='form-check-label'>
                <input type='radio' class='form-check-input' name='optionsRadios' id='optionsRadios1' value='Easy' checked>
                Easy
              </label>
            </div>
            <div class='form-check form-check-inline'>
              <label class='form-check-label'>
                <input type='radio' class='form-check-input' name='optionsRadios' id='optionsRadios2' value='Medium'>
                Medium
              </label>
            </div>
            <div class='form-check form-check-inline'>
              <label class='form-check-label'>
                <input type='radio' class='form-check-input' name='optionsRadios' id='optionsRadios3' value='Difficult'>
                Difficult
              </label>
            </div>
          </fieldset>

          <div class='form-check'>
            <label class='form-check-label'>
              <input type='checkbox' class='form-check-input' id='chkFavorite'>
              Favorite
            </label>
          </div>

          <div class='save-cancel-buttons'>
            <button type='button' class='btn btn-default btnSave'><span class='glyphicon glyphicon-floppy-disk' aria-hidden='true'></span>  Save</button>
            <button type='button' class='btn btn-default btnCancel'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span>  Cancel</button>
          </div>

        </form>
      </div>
    </div>
  `

  return html;

}


// html to get single result / one stairway based on _id
function getResultHTML(obj) {

  var html = `
    <div class='results' id='resultsList'>
      <div class='results-item' data-id='${obj._id}'>
        <div class='results-left-container'>
          <img class='results-image' src='${obj.photoURL}' alt='(no photo)'>
        </div>
        <div class='results-right-container'>
          <p class='results-name'>${obj.name}</p>
          <p class='results-description'>${obj.description}</p>
          <br>
          <table class="results-table">
            <tr><td>Neighborhood: </td><td>${obj.neighborhood}</td></tr>
            <tr><td>Number of Steps: </td><td>${obj.numSteps}</td>
            <tr><td>Difficulty: </td><td>${obj.difficulty}</td>
            <tr><td>Rating: </td><td>${obj.rating}</td>
            <tr><td>Favorite: </td><td>${obj.favorite}</td>
          </table>
          <br>
          <button type='button' class='btn btn-default btnUpdate' data-id='${obj._id}'>Update</button>
          <button type='button' class='btn btn-default btnDelete' data-id='${obj._id}'>Delete</button>
        </div>
      </div>
    </div>
  `

  return html;

}

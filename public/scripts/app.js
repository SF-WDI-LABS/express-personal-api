console.log("Sanity Check: JS is working!");

// declare globals
var $list;
var $body, $main;
var allResults = [];
var updateID;         // used to temporarily hold the id of the stairway that should be updated on save
var stairways = [];   // array to hold all stairway objects
var formMode;         // string to temporarily hold action to perform on Save button click - either Add/Post or Update/Put


$(document).ready(function(){

  console.log("Document is ready, JQuery is working!")

  // get references to the div elements
  $list = $('#resultsList');
  $body = $('body');
  $main = $('#main');

  // load the default home page content on page load
  showHomePage();

  // display the home page when the user clicks on the home page
  $body.on("click", ".btnHome", showHomePage);

  // display all the stairways
  $body.on("click", ".btnDisplayAll", displayAllStairways);

  // display the form for adding a new stairway when the navbar Add button is clicked
  $body.on("click", ".btnAdd", showFormForAdd);

  // save new stairway or updated stairway
  $main.on("click", ".btnSave", saveStairway);

  // hide the form if the user cancels out of the form
  $main.on("click", ".btnCancel", hideForm);

  // call the function to delete the stairway with the id that was clicked on
  $main.on("click", ".btnDelete", function() {
    console.log('clicked delete button for data-id: ', $(this).attr('data-id'));
    deleteStairway($(this).attr('data-id'));
  });

  // call the function to update the stairway with the id that was clicked on
  $main.on("click", ".btnUpdate", function() {
    console.log('clicked update button for data-id: ', $(this).attr('data-id'));
    showFormForUpdate($(this).attr('data-id'));
  });



  // OLD CODE
  // -------

  $(".display").on("click", function() {
    console.log("display button clicked");
    displayAllResults();
  });

  $(".clear").on("click", function() {
    console.log("clear button clicked");
    $(".results").empty();
  });

  $('.post-test').on('click', function() {
    $.ajax({
      method: 'POST',
      url: '/api/things',
      data: { id: 100, name: "thing", description: "thing description" },
      success: postOnSuccess,
      error: postOnError
    });
  });

  $('.add').on('click', addStairway);

  $list.on('click', '.frmBtnAddSave', saveAddStairway);

  $list.on('click', '.frmBtnAddCancel', cancelAddStairway);

  $list.on('click', '.update', function() {
    var id = $(this).attr('data-id');
    updateID = id;
    console.log("clicked on update button for id ",id);
    var index = findIndexByDBId(allResults, id);
    console.log("this is at index ", index);
    //updateStairway(index);
  });

  $list.on('click', '.frmBtnUpdateSave', saveUpdateStairway);

  $list.on('click', '.frmBtnUpdateCancel', cancelUpdateStairway);

  $list.on('click', '.delete', function() {
    console.log('clicked delete button to', '/api/things/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/things/'+$(this).attr('data-id'),
      success: deleteOnSuccess,
      error: deleteOnError
    });
  });

  function postOnSuccess() {
    console.log("post was successfull");
  }

  function postOnError() {
    console.log("post had error");
  }

  function deleteOnSuccess() {
    console.log("delete was successfull");
    displayAllResults();
  }

  function deleteOnError() {
    console.log("delete had error");
  }



});


function addStairway() {

  $(".results").empty();

  var html = `
  <input type='hidden' name='id' value='asdf8as7f9safs9fasdfsd' class='frmID'>
  <label>Name</label><input type='text' name='name' class='frmTextAddName'>
  <label>Description</label><input type='text' name='description' class='frmTextAddDescription'>
  <input type='button' name='save' value='Save' class='frmBtnAddSave'>
  <input type='button' name='cancel' value='Cancel' class='frmBtnAddCancel'>
  `;

  $(".results").append(html);

}


function saveAddStairway() {

  $.ajax({
    method: 'POST',
    url: '/api/things',
    data: {
      name: $(".frmTextAddName").val(),
      description: $(".frmTextAddDescription").val()
    },
    success: saveAddOnSuccess,
    error: saveAddOnError
  });

  function saveAddOnSuccess() {
    console.log("save was successfull!");
    displayAllResults();
  }

  function saveAddOnError() {
    console.log("there was an error attempting to save");
  }

}


function cancelAddStairway() {

  $(".results").empty();

  displayAllResults();

}



function saveUpdateStairway() {

  $.ajax({
    method: 'PUT',
    url: '/api/things/'+updateID,
    data: {
      name: $(".frmTextName").val(),
      description: $(".frmTextDescription").val()
    },
    success: saveUpdateOnSuccess,
    error: saveUpdateOnError
  });

  function saveUpdateOnSuccess() {
    console.log("update was successfull!");
    displayAllResults();
  }

  function saveUpdateOnError() {
    console.log("there was an error attempting to update");
  }

}

function cancelUpdateStairway() {

  $(".results").empty();

  displayAllResults();

}






function displayAllResults() {

  $.ajax({
    method: 'GET',
    url: '/api/things',
    success: function(json) {
      console.log("success displaying all results");
      console.log(json);
      allResults = [];
      allResults.push(json);
      console.log(allResults);
      $(".results").empty();
      json.forEach(function(element,index) {
        $(".results").append(`<p>name: ${element.name}, description: ${element.description}<input type=\"button\" name=\"delete\" value=\"Delete\" class=\"btn delete\" data-id=\"${element._id}\"><input type=\"button\" name=\"update\" value=\"Update\" class=\"btn update\" data-id=\"${element._id}\"></p>`);
      })
    },
    error: function() {
      $(".results").empty();
      console.log("there was an error attempting to display all the results");
    }
  });

}

// given an array of objects with MongoDB _id keys (strings), it will find the one that matches and return the index
function findIndexByDBId(arr, id) {
  var foundIndex = -1;
  arr[0].forEach(function(element,index) {
    console.log(element._id);
    if (element._id === id) {
      foundIndex = index;
    };
  });
  return foundIndex;
};




// NEW CODE HERE
// -------------



function showHomePage() {

  // empty the contents of the main container div
  $(".main-container").empty();

  // get the new html to insert
  var html = getHomeHTML();

  // append the html to the main container div
  $(".main-container").append(html);

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

}


// hide the form
function hideForm() {

  // test code to check the control values
  console.log("name:", $("#txtName").val());
  console.log("description:", $("#txtDescription").val());
  console.log("neighborhood:", $("#txtNeighborhood").val());
  console.log("photoURL:", $("#txtPhoto").val());
  console.log("number of steps:", $("#txtNumSteps").val());
  console.log("difficulty:", $("#optDifficulty").val());
  console.log("favorite:", $("#chkFavorite").val());

  // empty the contents of the main container div
  $(".main-container").empty();


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
      rating: 5,
      difficulty: "Medium",
      favorite: $("#chkFavorite").val()
    },
    success: function(json) {
      console.log("success!");
      console.log(json);

      // add the returned json object (from the database, including _id), to the stairways array
      stairways.push(json);

      // filter the array down to only the stairway object that was just added
      var stairway = stairways.filter(function(element, index) {
        return element._id === json._id;
      });

      // display the added stairway
      displayStairways(stairway);

    },
    error: function() {
      console.log("there was an error attempting to save new stairway");
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
      rating: 5,
      difficulty: "Medium",
      favorite: $("#chkFavorite").val()
    },
    success: function(json) {
      console.log("update success!");
      console.log(json);

      //var tempArr = [];
      //tempArr.push(json);

      // display the added stairway
      //displayStairways(tempArr);

      // display all stairways
      displayAllStairways();

    },
    error: function() {
      console.log("there was an error attempting to udpate the stairway");
    }

  });


}


function displayAllStairways() {

  $.ajax({
    method: 'GET',
    url: '/api/stairways',
    success: function(json) {
      console.log("success getting all results");
      //console.log(json);
      stairways = [];
      json.forEach(function(element,index) {
        stairways.push(element);
      })
      console.log(stairways);
      displayStairways(stairways);

    },
    error: function() {
      console.log("there was an error attempting to get all the results");
    }
  });



}


function displayStairways(arr) {

  // build the html string that will be appended to the main container div
  var html = "";
  arr.forEach(function(element,index) {
    html = html + getResultHTML(element);
  });

  //console.log(html);

  // empty the contents of the main container div
  $(".main-container").empty();

  // append the html to the main container div
  $(".main-container").append(html);

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
      console.log("there was an error attempting to delete");
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

  // set the global id variable
  updateID = id;

  //console.log(stairways);
  //console.log(stairway);

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
            <input type='text' class='form-control' id='txtName' placeholder='Enter staircase name'>
          </div>

          <div class='form-group'>
            <label for='txtDescription'>Description</label>
            <textarea class='form-control' id='txtDescription' rows='5' placeholder='Enter description'></textarea>
          </div>

          <div class='form-group'>
            <label for='txtNeighborhood'>Neighborhood</label>
            <input type='text' class='form-control' id='txtNeighborhood' placeholder='Enter neighborhood'>
          </div>

          <div class='form-group'>
            <label for='txtPhoto'>Link to Photo</label>
            <input type='text' class='form-control' id='txtPhoto' placeholder='Enter URL'>
          </div>

          <div class='form-group'>
            <label for='txtNumSteps'>Number of Steps</label>
            <input type='number' class='form-control' id='txtNumSteps' placeholder='Enter number of steps'>
          </div>

          <fieldset class='form-group form-check-inline' id='optDifficulty'>
            <label>Difficulty</label>
            <div class='form-check form-check-inline'>
              <label class='form-check-label'>
                <input type='radio' class='form-check-input' name='optionsRadios' id='optionsRadios1' value='easy' checked>
                Easy
              </label>
            </div>
            <div class='form-check form-check-inline'>
              <label class='form-check-label'>
                <input type='radio' class='form-check-input' name='optionsRadios' id='optionsRadios2' value='medium'>
                Medium
              </label>
            </div>
            <div class='form-check form-check-inline'>
              <label class='form-check-label'>
                <input type='radio' class='form-check-input' name='optionsRadios' id='optionsRadios3' value='difficult'>
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
            <button type='button' class='btn btn-primary btnSave'>Save</button>
            <button type='button' class='btn btn-primary btnCancel'>Cancel</button>
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
          <p class='results-neighborhood'>Neighborhood:  ${obj.neighborhood}</p>
          <p class='results-numsteps'>Number of Steps:  ${obj.numSteps}</p>
          <p class='results-difficulty'>Difficulty:  ${obj.difficulty}</p>
          <p class='results-rating'>Rating:  ${obj.rating}</p>
          <p class='results-favorite'>Favorite:  ${obj.favorite}</p>
          <button type='button' class='btn btn-default btnUpdate' data-id='${obj._id}'>Update</button>
          <button type='button' class='btn btn-default btnDelete' data-id='${obj._id}'>Delete</button>
        </div>
      </div>

    </div>
  `

  return html;

}

console.log("Sanity Check: JS is working!");
var $list;
var allResults = [];
var updateID;

$(document).ready(function(){

  console.log("Document is ready, JQuery is working!")

  $list = $('#resultsList');

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
    updateStairway(index);
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




function updateStairway(index) {

  $(".results").empty();

  var html = `
  <input type='hidden' name='id' value='${allResults[0][index]._id}' class='frmID'>
  <label>Name</label><input type='text' name='name' value='${allResults[0][index].name}' class='frmTextName'>
  <label>Description</label><input type='text' name='description' value='${allResults[0][index].description}' class='frmTextDescription'>
  <input type='button' name='save' value='Save' class='frmBtnUpdateSave'>
  <input type='button' name='cancel' value='Cancel' class='frmBtnUpdateCancel'>
  `;

  $(".results").append(html);

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

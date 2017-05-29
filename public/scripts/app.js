console.log("Sanity Check: JS is working!");

var $duckiesArray;
var allDucks = [];

$(document).ready(function(){

  $duckiesArray = $('#ducksTarget');

  // collecting duck data:
  $.ajax({
    method: 'GET',
    url: '/api/ducks',
    success: handleSuccess,
    //error: handleError
  });

  //  adding new duck data:
  $('#newDuckForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/ducks',
      data: $(this).serialize(),
      success: newDuckSuccess,
      //error: newDuckError
    });
  });

  //  deleting duck data:
  $duckiesArray.click('.deleteBtn', function(e) {

    $.ajax({
      method: 'DELETE',
      url: '/api/ducks/'+$(this).attr('data-id'),
      success: duckDeleteSuccess,
      error: duckDeleteError
    });
  });

});



// get duck formatted into HTML elements
function getDuckHTML(d) {
  let g;
  `${d.gender}` === "Female" ? g = ["She", "Her"] : g = ["He", "His"];
  return
  $('#ducksTarget').append(
    `<div class="row>">
      <div class="col-xs-10">
        <li>${d.name} belongs to ${d.bff}. ${d.description} ${g[1]} favorite quote is '${d.favQuote}'</li>
      </div>
      <div class="col-xs-2">
        <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${d._id}>Delete Duck</button>
      </div>
    </div><br/>`);
};

// get all ducks in given array formatted into HTML elements
function getAllDucksHTML(ducks) {

  let result = ducks.forEach(function(d){
    let g;
    d.gender === "Female" ? g = ["She", "Her"] : g = ["He", "His"];
    $('#ducksTarget').append(
      `<div class="row>">
        <div class="col-xs-10">
          <li>${d.name} belongs to ${d.bff}. ${d.description} ${g[1]} favorite quote is '${d.favQuote}'</li>
        </div>
        <div class="col-xs-2">
          <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${d._id}>Delete Duck</button>
        </div>
      </div><br/>`
    );
  });
  return result;
};

// append all the duck data to the HTML view - #duckTarget
function render() {
  $duckiesArray.empty();

  let duxHTML = getAllDucksHTML(allDucks);

  $duckiesArray.append(duxHTML);
}

//
function handleSuccess(jsonData) {
  allDucks = jsonData;
  render();
};


// new duck:
function newDuckSuccess(jsonData) {
  $('#newDuckForm input').val('');
  allDucks.push(jsonData);
  render();
};

// delete duck:
function duckDeleteSuccess(duck) {
  let duckId = duck._id;
  console.log(duckId);
  return allDucks.filter(function(e) {
    return e._id !== duckId;
  });
}

function duckDeleteError() {
  console.log("error");
};

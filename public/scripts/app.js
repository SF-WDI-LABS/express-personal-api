console.log("Sanity Check: JS is working!");

var $duckiesArray;
var allDucks = [];

$(document).ready(function(){

  $duckiesArray = $('#ducksTarget');

  $.ajax({
    method: 'GET',
    url: '/api/ducks',
    success: handleSuccess,
    //error: handleError
  });

});



// get duck formatted into HTML elements
function getDuckHTML(d) {
  let g;
  d.gender === "Female" ? g = ["She", "Her"] : g = ["He", "His"];
  return
  `<li>${d.name} belongs to ${d.bff}. ${d.description} ${g[1]} favorite quote is '${d.favQuote}'</li>
  <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${d._id}>Delete Duck</button>`;
};

// get all ducks in given array formatted into HTML elements
function getAllDucksHTML(ducks) {

  let result = ducks.forEach(function(d){
    let g;
    d.gender === "Female" ? g = ["She", "Her"] : g = ["He", "His"];
    $('#ducksTarget').append(
      `<div class="row>">
        <div class="col-xs-8-offset-1">
          <li>${d.name} belongs to ${d.bff}. ${d.description} ${g[1]} favorite quote is '${d.favQuote}'</li>
        </div>
        <div class="col-xs-3">
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

function handleSuccess(jsonData) {
  allDucks = jsonData;
  render();
};

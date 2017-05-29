console.log("Sanity Check: JS is working!");

var $duckiesArray;
var allDucks = [];
var newDuckArray = [];

$(document).ready(function(){

  $duckiesArray = $('#ducksTarget');

  $.ajax({
    method: 'GET',
    url: '/api/ducks',
    success: getAllDucks,
    //error: handleError
  });

  // $('#newDuckForm').on('submit', function(el) {
  //   el.preventDefault();
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/ducks',
  //     data: $(this).serialize(),
  //     success: newDuckSuccess,
  //     //error: newDuckError
  //   });

});

function getAllDucks(ducks) {
  console.log("Ducky Listing Test: ", ducks);
  ducks.forEach(function(d){
    let g;
    d.gender === "female" ? g = ["she", "her"] : g = ["he", "his"];
    $('#ducksTarget').append(`<li>${d.name} belongs to ${d.bff}. ${d.description} ${g[1]} favorite quote is '${d.favQuote}'</li>`);
  });
};



// function newDuckSuccess(jsonDuck) {
//   $('#newDuckForm input').val('');
//   newDuckArray.push(jsonDuck);
//
//   getAllDucks(newDuckArray);
// }

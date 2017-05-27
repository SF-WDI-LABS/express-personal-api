console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: '/api/ducks',
    success: getAllDucks,
    //error: handleError
  });

});

function getAllDucks(ducks) {
  return console.log("Ducky Listing Test: ", ducks);
}

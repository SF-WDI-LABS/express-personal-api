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
  console.log("Ducky Listing Test: ", ducks);
  ducks.forEach(function(d){
    $('#ducks_target').append(`<li>${d.name} belongs to ${d.bff}. ${d.description} Her/His favorite quote is '${d.favQuote}'</li>`);
  });
};

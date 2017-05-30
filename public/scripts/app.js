console.log("Sanity Check: JS is working!");

let allRest = [],
    $restList;

$(document).ready(function(){

  $restList = $('#restaurant_target')

// your code
  $.ajax({
    method: 'GET',
    url: '/api/restaurant',
    success: handleSuccess
  });

  $('#rest-form').on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/api/restaurant',
        data: $(this).serialize(),
        success: newRestSuccess
      });
  });

  $restList.on('click', '.deleteBtn', function() {
   console.log('clicked delete button to', '/api/restaurant/'+$(this).attr('data-id'));
   $.ajax({
     method: 'DELETE',
     url: '/api/restaurant/'+$(this).attr('data-id'),
     success: deleteRestSuccess,
   });
 });

});

function getRestHtml(restaurants){
      return `
        <hr>
        <div class="container">
          <div class="row" data-id="${restaurants._id}">
            <div class="col-xs-1">
              <img src="${restaurants.image}" class="images">
            </div>
            <div class="col-xs-4">
              <h2 class="restaurant-name">${restaurants.name}</h2>
              <p class="rating">${restaurants.number_of_stars} stars out of 5</p>
              <p class="address">${restaurants.address}</p>
              <p class="text-muted"><em>${restaurants.type}</em></p>
            </div>
            <div class="col-xs-4">
              <p><strong>Notes:</strong></p>
              <p class="notes">${restaurants.notes}</p>
            </div>
            <div class"col-xs-2>
              <button type="button" name="button" class="deleteBtn btn btn-default" data-id="${restaurants._id}">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </div>
    `
}

function getAllRestsHtml(restaurants) {
  return restaurants.map(getRestHtml).join("");

}

function render() {
  // empty existing posts from view
  $restList.empty();

  // pass `allBooks` into the template function
  var restsHtml = getAllRestsHtml(allRest);


  // append html to the view
  $restList.append(restsHtml);
};


function handleSuccess(json) {
  allRest = json;
  render();
}

function newRestSuccess(json) {
  $('#rest-form input').val('');
  allRest.push(json);
  render();
}

function deleteRestSuccess(json) {
  var rest = json;
  var restId = json._id;
  // find the restaurant with the correct ID and remove it from our allRest array
  for(var index = 0; index < allRest.length; index++) {
    if(allRest[index]._id === restId) {
      allRest.splice(index, 1);
      break;
    }
  }
  render();
}

/*

use restaurant name submitted as query param
restaurants.name
get image from yelp API
return the image url
find the restaurant by ID
insert the url in the image spot in database
save the new array

*/

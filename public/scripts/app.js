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

  });

function getRestHtml(restaurants){
  console.log("This is restaurants: " + restaurants)
      return `
        <hr>
        <div class="container">
          <div class="row">
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
          </div>
        </div>
    `
}

function getAllRestsHtml(restaurants) {
  console.log("getAllRests param is " + restaurants)
  return restaurants.map(getRestHtml).join("");

}

function render() {
  console.log($restList)
  // empty existing posts from view
  $restList.empty();

  // pass `allBooks` into the template function
  var restsHtml = getAllRestsHtml(allRest);


  // append html to the view
  $restList.append(restsHtml);
};


function handleSuccess(json) {
  allRest = json;
  console.log("json = " + json)
  render();
}

function newRestSuccess(json) {
  $('#rest-form input').val('');
  allRest.push(json);
  render();
}

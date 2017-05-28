console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// your code
$.ajax({
  method: 'GET',
  url: '/api/restaurant',
  success: function(restaurants){
        console.log(restaurants)
        console.log("success")
        $('#restaurant_target').append(`
          <hr>
          <div class="container">
            <div class="row">
              <div class="col-xs-1">
              <img src="${restaurants.restaurants[0].image}" class="images">
              </div>
              <div class="col-xs-4">
                <h2 class="restaurant-name">${restaurants.restaurants[0].name}</h2>
                <p class="rating">${restaurants.restaurants[0].number_of_stars} stars out of 5</p>
                <p class="address">${restaurants.restaurants[0].address}</p>
                <p class="text-muted"><em>${restaurants.restaurants[0].type}</em></p>
              </div>
              <div class="col-xs-5">
              </div>
            </div>
          </div>
          `)
      },
      error: function(){
        alert("Wow. Bad thing.")
      }
})

});

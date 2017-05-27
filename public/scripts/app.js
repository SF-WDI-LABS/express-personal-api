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
          <li>${restaurants.restaurants[0].name}</li>
          `)

      },
      error: function(){
        alert("Wow. Bad thing.")
      }
})

});

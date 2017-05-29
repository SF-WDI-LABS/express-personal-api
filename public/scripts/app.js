console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  let map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(37.775,-122.419),
      zoom: 2
    });
  }

  initMap();

});


// $('button').on(click, function(event){

  $.ajax({
     method: "GET",
     url: "/api/sammich",
     success: function(sammiches){
       console.log("success")

       sammiches.forEach(function(sammich){
         $(".sammich-list").append(`
           <div class="sammich" id="sammich-${sammich._id}">
             <h3>Chicken Spots:</h3>
             <h4>${sammich.resturantName}</h4>
             <img src=${sammich.image}>
             <p>Description: ${sammich.description}</p>
             <p>Address: ${sammich.address}</p>
           </div>
         `);
       })

     },
     error: function(){
       alert("Meh. It didnt work.")
     }
   });
// });

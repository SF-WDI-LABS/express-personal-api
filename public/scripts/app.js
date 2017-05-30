console.log("Sanity Check: JS is working!");



$(document).ready(function(){

  let map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(37.775,-122.419),
      zoom: 12
    });
  }

  initMap();
  // var $chickenSearch = $('#chicken-search');
  //
  // $chickenSearch.on(click, function(event){
  //
  // });

  $.ajax({
    method: "GET",
    url: "/api/sammich",
    success: function(sammiches){
      console.log("success");

      sammiches.forEach(function(sammich){
        $(".sammich-list").append(`
          <div class="sammich" id="sammich-${sammich._id}">
          <h4>Restaurant: ${sammich.name}</h4>
          <img src=${sammich.image}>
          <p>Description: ${sammich.description}</p>
          <p>Address: ${sammich.address}</p>
          </div>
          `);
          let coords = sammich.coordinates;
          let latLng = new google.maps.LatLng(coords[1],coords[0]);
          let marker = new google.maps.Marker({
            position: latLng,
            map: map,
            // icon: {url:"images/earthquake.png", scaledSize: new google.maps.Size(24, 24)}
          })


        });
      },
      error: function(){
        alert("Meh. It didnt work.");
      }
    });
  });

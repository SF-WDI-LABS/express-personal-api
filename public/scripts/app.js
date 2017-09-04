$(document).ready(function() {
$.ajax({
	method:"GET",
	url: '/api/bjj',
	success: renderMultipleReviews
});



  function formData(e){
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
   $.ajax({
    method: "POST",
    url: '/api/bjj',
    success: renderMultipleReviews
   })
    $(this).trigger("reset");
  }



$('.form-horizontal').on('submit', formData);



});




function renderMultipleReviews(reviews) {
  
  reviews.forEach(function(review) {
    console.log(review)
  renderBjj(review);
  });

}


function renderBjj(bjj) {


  var bjjHtml = (`
  
<div class="container forms">
<div class="row">
<div class="col-sm-4">
<div class="card" style="width: 20rem;">
  <img class="card-img-top" src='${bjj.image}' alt="Card image cap">
  <div class="card-body">
    <h4 class="card-title">${bjj.gymName}</h4>
    <p class="card-text"></p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${bjj.reviews}</li>
    <li class="list-group-item">${bjj.gymLocation}</li>
  </ul>
  </div>
</div>

  </div>
  </div>
</div>
</div>

  `);


  $('#gymDisplay').prepend(bjjHtml);
}



// function handleSaveAlbum(e) {
// e.preventDefault();

//   var currentAlbumId = $(this).closest('.form').data('bjj-id');
//   var currentAlbumElem = $(this).closest('.form');

//   $.ajax({
//     method: "PUT",
//     url: "/api/bjj/"+currentAlbumId,
//     data: {
//       gymName: gymName,
//       gymLocatation: gymLocation,
//       image: image,
//       reviews:reviews
//     },
//     success: function(data) {
//       renderBjj(data);
//     }
//   })


// }

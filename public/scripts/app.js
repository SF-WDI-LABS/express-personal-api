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
   $.post('/api/bjj', formData).done(renderMultipleReviews);
    window.location = window.location; 
  }

$('.form-horizontal').on('submit', formData)
  


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
<div class="col-sm-12">
<div class="card" style="width: 100%;">
  <img class="card-img-top" src='${bjj.image}' alt="Card image cap">
  <div class="card-body">
    <h4 class="card-title">Gym: ${bjj.gymName}</h4>
    <p class="card-text"></p>
  </div>
  <ul class="list-group list-group-flush">
   <li class="list-group-item">Location: ${bjj.gymLocation}</li>
    <li class="list-group-item">Review: ${bjj.reviews}</li>
   
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




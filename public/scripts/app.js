$(document).ready(function() {

// ajax get request to get data from database and render to client side
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

// form submission event handler
$('.form-horizontal').on('submit', formData)
  


});



// loop through data and render to html
function renderMultipleReviews(reviews) {

  reviews.forEach(function(review) {
    console.log(review)
  renderBjj(review);
  });

}

// data render to html function
function renderBjj(bjj) {


  var bjjHtml = (`
  
<div class="container forms">
<div class="row">
<div class="col-sm-12">
<div class="card" style="width: 75%;">
  <img class="card-img-top" src='${bjj.image}' alt="Card image cap">
  <div class="card-body">
    <h4 class="card-title">Jiu-Jitsu Academy Name:<br> ${bjj.gymName}</h4>
    <p class="card-text"></p>
  </div>
  <ul class="list-group list-group-flush">
   <li class="list-group-item"><span class="desc">Location</span>: ${bjj.gymLocation}</li>
    <li class="list-group-item"><span class="desc">Review:</span> ${bjj.reviews}</li>
   
  </ul>
  </div>
</div>

  </div>
  </div>
</div>
</div>

  `);

// append to div
  $('#gymDisplay').prepend(bjjHtml);
}




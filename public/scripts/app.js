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
$('.form-horizontal').on('submit', formData);
$('#gymDisplay').on("click", ".deleteBtn", handleDeleteBjj);
});



// loop through data and render to html
function renderMultipleReviews(reviews) {
console.log(reviews);
  reviews.forEach(function(review) {
  renderBjj(review);
  });

}

// data render to html function
function renderBjj(bjj) {


  var bjjHtml = (`
  
<div class="container forms" data-bjj='${bjj._id}'>
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
  <button class="deleteBtn btn-danger" type="click">Remove review</button>
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



function handleDeleteBjj(e) {
  console.log('delete-song clicked!');
  var currentBjjId = $(this).closest('.forms').attr('data-bjj'); // "5665ff1678209c64e51b4e7b"
  var currentBjjElem =$(this).closest('.card');
  console.log(currentBjjId);
 $.ajax({
  method:"DELETE",
  url: '/api/bjj/'+currentBjjId,
  success: currentBjjElem.remove()
 })
}

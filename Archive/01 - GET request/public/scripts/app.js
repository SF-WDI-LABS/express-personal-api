console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// your code
//Create a variable to shorthand for the delete button section in the index.html
$venueList = $("#bookTarget");
//This will pull the api information from the below path
$.ajax({
  url: '/api',
  success: handleSuccess,
  error: handleError
});

//Create a new form on the submit button
  //Create a submit button in the index.html
$('#newVenueForm').on('submit', function(event) {
  //Prevent the button from submitting AKA refreshing the page
  event.preventDefault();
  //POST the new information to the path below and will turn it into a string using serialize
  $.ajax({
    method: 'POST',
    url: '/api',
    data: $(this).serialize(),
    success: newVenueSuccess,
    error: newVenueError
  });
});



});

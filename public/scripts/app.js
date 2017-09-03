console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// your code
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})

});

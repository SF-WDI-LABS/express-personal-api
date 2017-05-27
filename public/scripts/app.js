console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// your code
$.ajax({
  method: 'GET',
  url: 'api/restaurant',
  success: function(){
    console.log("success")
  }
})

});

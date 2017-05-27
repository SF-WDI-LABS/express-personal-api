console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  console.log("Document is ready, JQuery is working!")

  $(".clear").on("click", function() {
    console.log("clear button clicked");
    $(".results").empty();
  });

  $(".display").on("click", function() {
    console.log("display button clicked");
  });

});

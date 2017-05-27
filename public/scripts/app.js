console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  console.log("Document is ready, JQuery is working!")

  $(".display").on("click", function() {
    console.log("display button clicked");
    displayAllResults();
  });

  $(".clear").on("click", function() {
    console.log("clear button clicked");
    $(".results").empty();
  });

  $('.post-test').on('click', function() {
    $.ajax({
      method: 'POST',
      url: '/api/things',
      data: { id: 100, name: "thing", description: "thing description" },
      success: postOnSuccess,
      error: postOnError
    });
  });

  function postOnSuccess() {
    console.log("post was successfull");
  }

  function postOnError() {
    console.log("post had error");
  }

  function displayAllResults() {

    $.ajax({
      method: 'GET',
      url: '/api/things',
      success: function(json) {
        console.log("success displaying all results");
        console.log(json);
        $(".results").empty();
        json.forEach(function(element,index) {
          $(".results").append(`<p>name: ${element.name}, description: ${element.description}</p>`);
        })
      },
      error: function() {
        $(".results").empty();
        console.log("there was an error attempting to display all the results");
      }
    });

  }

});

console.log("Sanity Check: JS is working!");

$(document).ready(function(){

    //  COUNTER CLOCK - RESETS EVERYTIME PAGE IS REFRESHED
    let startDateTime = new Date();
    let startStamp = startDateTime.getTime();

    function updateClock() {
        let newDate = new Date();
        let diff = Math.round(newDate-startStamp);
        let days = Math.floor(diff/(1000*60*60*24));
        let hours = Math.floor(diff/(1000*60*60)%24);
        let minutes = Math.floor(diff/(1000*60)%60);
        let seconds = Math.floor((diff/1000)%60);

        // set counter to restart and run once after each pie donation

        $('#new-pie-time-lapse').append(days +" day(s), "+ hours +" hour(s), "+ minutes +" minute(s), "+ seconds +" second(s) wasting away without pie")
    };

    setInterval(updateClock, 1000); // clock changes by 1 second

    // GET ALL PIES ON PAGE LOAD
    let template;
    let $pieList = $('.pie-list');

    // display on pie donations as HTML
    $.ajax({
        method: "GET",
        url: "/api/pies",
        success: function(pies) {
            // SET 'Pies' to pie data from API
            pies.forEach(function (pie) {
              $(".pie-list").append(`
                <div class="pie" id="pie-${pie._id}">
                  <p>${pie.donor_name} sent Bear ${pie.pie_quantity} ${pie.pie_type} pie(s)</p><img src="https://bearheartsbat.files.wordpress.com/2016/06/bouncypiebear.gif?w=1142" height="auto" width="200"><br><br>
                </div>
              `);
            })
        },
        error: function() {
          alert("Pie Error! :(");
        }
    })
    //serialize form data
    var newPie = $(this).serialize();
    $pieList.on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/pies",
            data: newPie,
            success: function onCreateSuccess(response) {
                // add new pie donor to allPies
                allPies.push(response);
                // render all pie donations to views
                render();
            }
        })
    });


    // for update: submit event on any .update-pie form
  // ... inside the piesList element
  $pieList.on('submit', '.pie-list', function (event) {
        event.preventDefault();

    // find the pie's id (stored in HTML as `data-id`)
    var pieId = $(this).closest('.pie').attr('data-id');

    // find the pie to update by its id
    var pieToUpdate = allPies.filter(function (pie) {
      return pie._id == pieId;
    })[0];

    // serialze form data
    var updatedPie = $(this).serialize();

    // PUT request to update pie
    $.ajax({
      type: 'PUT',
      url: '/api/pies' + '/' + pieId,
      data: updatedPie,
      success: handleSuccess,
      error: handleError
    });
  })
  // POST request to add pie donations
  $pieList.on('submit', function(e) {
      e.preventDefault();
      $.ajax({
          method: 'POST',
          url: '/api/pies' + $(this).attr('data-id'),
          data: $(this).serializeArray(),
          success: newPieDonor,
          error: newPieError
      })
  })

    function render () {
        // empty existing posts from view
        $pieList.empty();

    };
    function handleSuccess(jsonData) {
        allPies = jsonData;
        render();
    }
    function handleError(e) {
        console.log('oh no!');
        $('.pie-list').text('Failed to pie donations, is the server working?');
    }
    function newPieDonor(jsonData) {
       $('#donate-pie input').val('');
       allPies.push(jsonData);
       render();
    }
    function newPieError() {
        console.log("new pie error!");
}
});

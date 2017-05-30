console.log("Sanity Check: JS is working!");

$(document).ready(function(){

    //  COUNTER CLOCK - RESETS EVERYTIME PAGE IS REFRESHED
    let startDateTime = new Date();
    let startStamp = startDateTime.getTime();

    function updateClock() {
        let newDate = new Date();
        let diff = Math.round(newDate-startStamp);
        let days = Math.floor(diff/(1000*60*60*24));
        let hours = Math.floor(diff/(1000*60*60));
        let minutes = Math.floor(diff/(1000*60));
        let seconds = Math.floor(diff/1000);

        document.getElementById("time-elapsed").innerHTML = days +" day(s), "+ hours +" hour(s), "+ minutes +" minute(s), "+ seconds +" second(s) wasting away without pie";
    };

    setInterval(updateClock, 1000); // clock changes by 1 second

    // GET ALL PIES ON PAGE LOAD
    let template;
    let $pieList = $('#pie-list');
    let allPies = [];

    // display on pie donations as HTML
    $.ajax({
        method: "GET",
        url: "/api/pies",
        success: function(pies) {
            // SET 'allPies' to pie data from API
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
    $('.pie-list').on('submit', function(e) {
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
  $pieList.on('submit', '.update-piedonors', function (event) {
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
      success: function onUpdateSuccess(data) {
        // replace pie to update with newly updated version (data)
        allPies.splice(allPies.indexOf(pieToUpdate), 1, data);
        // render all pies to view
        render();
      }
    });
  })
  // POST request to add pie donations
  $pieList.on('submit', '.pie-list', function(e) {
      e.preventDefault();
      console.log('new pie donation');
      $.ajax({
          method: 'POST',
          url: '/api/pies' + $(this).attr('data-id'),
          data: $(this).serializeArray(),
      })
  })
  // for delete: click event on any `.delete-pie` button
  // ... inside the pieList element
  $pieList.on('click', '.delete-pie', function (event) {
    event.preventDefault();

    // find the pie's id (stored in HTML as `data-id`)
    var pieId = $(this).closest('.pie').attr('data-id');

    // find the pie to delete by its id
    var pieToDelete = allPies.filter(function (pie) {
      return pie._id == pieId;
    })[0];

    // DELETE request to delete pie
    $.ajax({
      type: 'DELETE',
      url: "/api/pies" + '/' + pieId,
      success: function onDeleteSuccess(data) {
        // remove deleted  from all pies
        allPies.splice(allPies.indexOf(pieToDelete), 1);

        // render all pies to view
        render();
      }
    })
  });
    function render () {
        // empty existing posts from view
        $pieList.empty();

    };
    function handleSuccess(json) {
        allBooks = json;
        render();
    }
    function handleError(e) {
        console.log('oh no!');
        $('.pie-list').text('Failed to pie donations, is the server working?');
    }
    function newPieDonar(json) {
       $('#donate-pie input').val('');
       allPies.push(json);
       render();
    }
    function newPieError() {
        console.log("new pie error!");
}
});

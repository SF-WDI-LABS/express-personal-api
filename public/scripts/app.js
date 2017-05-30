console.log("Sanity Check: JS is working!");

$(document).ready(function(){
    // ELEMENT TO DISPLAY LIST OF PIE DONATIONS



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
    let allPies = [];
    let $pieList = $('#pie-list');

    function render() {
        // EMPTY EXISTING PIE DONATIONS FROM VIEW
        $pieList.empty();
    };


// form to submit pie donation to Bear
let $donatePie = $('#donate-pie');
//listen for submit event on form
$donatePie.on('submit', function(event) {
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/api/pies",
        success: function(pies) {
            console.log("pies received!")
            // SET 'allPies' to pie data from API
            pies.forEach(function (pie) {
              $(".pie-list").append(`
                <div class="pie" id="pie-${pie._id}">
                  <p>${pie.donor_name} sent Bear ${pie.pie_quantity} ${pie.pie_type} pie(s)</p><br><br>
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

    $.ajax({
        method: "POST",
        url: "/api/pies",
        data: newPie,
        success: function onCreateSuccess(response) {
            console.log(response);

            // add new pie donor to allPies
            allPies.push(response);

            // render all pie donations to views
            render();
        }
    });
        // reset the form
        $donatePie[0].reset();
        $donatePie.find('input').first().focus();
    });

    $pieList.on('click', '.edit-icon', function(event) {
        event.preventDefault();

        // grab the target DOM id from the extra data stored on this element and target element's visibility
        var editFormDivId = $(this).data('target');
        $(editFormDivId).toggle()
    })
    // for update: submit event on any .update-todo form
  // ... inside the todosList element
  $pieList.on('submit', '.update-piedonors', function (event) {
    event.preventDefault();

    // find the todo's id (stored in HTML as `data-id`)
    var todoId = $(this).closest('.pie').attr('data-id');

    // find the todo to update by its id
    var pieToUpdate = allPies.filter(function (todo) {
      return pie._id == pieId;
    })[0];

    // serialze form data
    var updatedPie = $(this).serialize();

    // PUT request to update todo
    $.ajax({
      type: 'PUT',
      url: '/api/pies' + '/' + pieId,
      data: updatedPie,
      success: function onUpdateSuccess(data) {
        // replace todo to update with newly updated version (data)
        allPies.splice(allPies.indexOf(pieToUpdate), 1, data);

        // render all todos to view
        render();
      }
    });
  })

  // for delete: click event on any `.delete-todo` button
  // ... inside the todosList element
  $pieList.on('click', '.delete-todo', function (event) {
    event.preventDefault();

    // find the todo's id (stored in HTML as `data-id`)
    var pieId = $(this).closest('.pie').attr('data-id');

    // find the todo to delete by its id
    var pieToDelete = allPies.filter(function (pie) {
      return pie._id == pieId;
    })[0];

    // DELETE request to delete todo
    $.ajax({
      type: 'DELETE',
      url: "/api/pies" + '/' + pieId,
      success: function onDeleteSuccess(data) {
        // remove deleted todo from all todos
        allPies.splice(allPies.indexOf(pieToDelete), 1);

        // render all todos to view
        render();
      }
    });
  });




});

console.log("Sanity Check: JS is working!");

$(document).ready(function(){

    //  COUNTER CLOCK - RESETS EVERYTIME PAGE IS REFRESHED
    var startDateTime = new Date();
    var startStamp = startDateTime.getTime();

    var newDate = new Date();
    var newStamp = newDate.getTime();

    var timer;

    function updateClock() {
        newDate = new Date();
        newStamp = newDate.getTime();
        var diff = Math.round((newStamp-startStamp)/1000);

        var days = Math.floor(diff/(24*60*60));

        var hours = Math.floor(diff/(60*60));

        var minutes = Math.floor(diff/(60));

        diff = diff-(minutes*60);

        var seconds = diff;

        document.getElementById("time-elapsed").innerHTML = days +" day(s), "+ hours +" hour(s), "+ minutes +" minute(s), "+ seconds +" second(s) wasting away without pie";
    }

    setInterval(updateClock, 1000); // clock changes by 1 second

    // PIES DONATED AS JSON INTO HTML
    $.ajax({
        method: "GET",
        url: "/api/pies",
        success: function(pies){
            console.log("pies received!")

        pies.forEach(function(pie){
          $(".pie-list").append(`
            <div class="pie" id="pie-${pie._id}">
              <p>${pie.donor_name} sent Bear ${pie.pie_quantity} ${pie.pie_type} pie(s)</p><br><br>
            </div>
          `);
        })
      },
      error: function(){
        alert("Pie Error! :(")
      }
    })

});

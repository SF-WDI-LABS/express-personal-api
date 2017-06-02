let $pieList;
let allPies = [];

$(document).ready(function(){
    /*
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

        $('#new-pie-time-lapse').append(days + day(s), + hours + hour(s), + minutes + minute(s), + seconds + second(s) wasting away without pie); o
    }

    setInterval(updateClock, 1000); // clock changes by 1 second
    */


    // SET 'Pies' to pie data from API
    // Begin CRUD for pie donations

    $pieList = $('.pie-list');
    // show index of pie donations as HTML
    $.ajax({
        method: 'GET',
        url: '/api/pies',
        success: getPieDataSuccess
    });
    // add new pie donation
    $('#donate-pie').on('submit', function(e) {
        // Show submission as HTML
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/pies',
            data: $(this).serialize(),
            success: newPieSuccess,
            error: newPieError
        })
    });

    // pass JSON pie data to HTML
    function getPieHTML(pie) {
        return `<div class="pie" id="pie-${pie._id}">
                <img src=https://bearheartsbat.files.wordpress.com/2016/06/bouncypiebear.gif?w=1142 height=auto width=200>
                <p>${pie.donor_name} sent Bear ${pie.pie_quantity} ${pie.pie_type} pie(s)</p>
            </div>
            <div class="col-6-md">
                <button type="button" class="btn btn-danger">Give More Pies</button><br><br>
            </div>`;
    }

    function getAllPiesHTML(pies) {
        return pies.map(getPieHTML).join("");
    }
    function render () {
        $pieList.empty();

        let piesHTML = getAllPiesHTML(allPies);

        $pieList.append(piesHTML);
    };
    function getPieDataSuccess(jsonData) {
        allPies = jsonData;
        render();
    };
    function newPieSuccess(jsonData) {
       $('#donate-pie input').val('');
       allPies.push(jsonData);
       render();
   };
    function newPieError() {
        console.log('new pie error!');
    };
});

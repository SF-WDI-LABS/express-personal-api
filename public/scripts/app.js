console.log("Sanity Check: JS is working!");

$(document).ready(function(){

    $.ajax({
        method: 'GET',
        dataType: 'json',
        url: 'https://agile-inlet-98335.herokuapp.com/api/movies',
        success: function(responseData){
            let source   = $("#handlebars-template").html();
            let template = Handlebars.compile(source); // turn it into HTML.
            let html = template({movies: responseData}); // put the data into HTML.
            $('main').html(html);

        }
        
    })

});

console.log("Sanity Check: JS is working!");

function renderAllMovies() {
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
}

function showOneMovie() {
    $('main').on('click', 'button.show', function(e) {
        let movieId = $(e.target).attr('data-id');
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: `https://agile-inlet-98335.herokuapp.com/api/movies/${movieId}`,
            success: function(responseData){
                let source   = $("#one-movie-template").html();
                let template = Handlebars.compile(source); // turn it into HTML.
                let html = template(responseData); // put the data into HTML.
                $('main').html(html);
            }
        })
    })
}

function rerenderHome() {
    $('main').on('click', 'button.home', function(e) {
        renderAllMovies();
    })
}


$(document).ready(function(){
    
    renderAllMovies();
    showOneMovie();
    rerenderHome();


});

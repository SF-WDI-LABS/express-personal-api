console.log("Sanity Check: JS is working!");

function renderAllMovies() {
    $.ajax({
        method: 'GET',
        dataType: 'json',
        url: '/api/movies',
        success: function(responseData){
            let source   = $("#handlebars-template").html();
            let template = Handlebars.compile(source); // turn it into HTML.
            let html = template({movies: responseData}); // put the data into HTML.
            $('main').html(html);
        }
    })
}

function renderOneMovie(movieId) {
    $.ajax({
        method: 'GET',
        dataType: 'json',
        url: `/api/movies/${movieId}`,
        success: function(responseData){
            let source   = $("#one-movie-template").html();
            let template = Handlebars.compile(source); // turn it into HTML.
            let html = template(responseData); // put the data into HTML.
            $('main').html(html);
        }
    })
}
function showOneMovie() {
    $('main').on('click', 'button.show', function(e) {
        let movieId = $(e.target).attr('data-id');
        renderOneMovie(movieId);
    })
}

function rerenderHome() {
    $('main').on('click', 'button.home', function(e) {
        renderAllMovies();
    })
}

function addNewMovie() {
    $('main').on('click', 'button.submitAdd', function(e) {
        e.preventDefault();
        let addedMovieObj = {};
        $('form.addMovieForm').serializeArray().forEach(function(attr) {
            addedMovieObj[attr.name] = attr.value;
        })
        
        // Now send the added movie object to the database via the server.
        $.ajax({
            method: 'POST',
            data: addedMovieObj,
            dataType: 'json',
            url: '/api/movies',
            success: function(responseData) {
                renderAllMovies();
            }
        })
    })
}

function deleteMovie() {
    $('main').on('click', 'button.delete', function(e) {
        let movieId = $(e.target).attr('data-id');
        $.ajax({
            method: 'DELETE',
            dataType: 'json',
            url: `/api/movies/${movieId}`,
            success: function(responseData) {
                renderAllMovies();
            }
        })
    })
}

function editMovie() {
    $('main').on('click', 'button.submitEdit', function(e) {
        e.preventDefault();
        let btnDataId = $(e.target).attr('data-id');
        let edittedMovieObj = {};
        $('form.editMovieForm').serializeArray().forEach(function(attr) {
            edittedMovieObj[attr.name] = attr.value;
        })
        console.log(edittedMovieObj);
        
        // Now send the added movie object to the database via the server.
        $.ajax({
            method: 'PUT',
            data: edittedMovieObj,
            dataType: 'json',
            url: `/api/movies/${btnDataId}`,
            success: function(responseData) {
                renderOneMovie(btnDataId);
            }
        })
    })
}

$(document).ready(function(){
    
    renderAllMovies();
    showOneMovie();
    rerenderHome();
    addNewMovie();
    deleteMovie();
    editMovie();

});

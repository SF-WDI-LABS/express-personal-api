console.log("Sanity Check: JS is working!");

$(document).ready(function(){
    $(document).on("click", '.add-movie-button', function(event) {
        event.preventDefault();
        // console.log($('.title-input').val());
        $.ajax({
            method: "POST",
            url: "/api/movies/",
            data: {
                title: $('.title-input').val(),
                year: $('.year-input').val(),
                director: $('.director-input').val(),
                image: $('.image-input').val(),
            }
        });
        $.ajax({
            method: "GET",
            url: "api/movies",
            success: renderMovies,
        });
    });

    $(document).on("click", '.save-movies', function(event) {
        event.preventDefault();
        let movieId = $(this).closest('.save-movies').data('movie-id');
        let movies = $(this).closest('.list-container')
        console.log(movies.find('.title-edit').val())
        console.log(movies.find('.release-edit').val());
        console.log(movies.find('.director-edit').val())
        $.ajax({
            method: "PUT",
            url: "/api/movies/" + movieId,
            data: {
                title: movies.find('.title-edit').val(),
                year: movies.find('.release-edit').val(),
                director: movies.find('.director-edit').val(),
                // image: $('.image-input').val(),
            }
        })
        $.ajax({
            method: "GET",
            url: "api/movies",
            success: renderMovies,
        });
    })

    $(document).on("click", '.edit-movies', function(event) {
        event.preventDefault();
        let movieId = $(this).closest('.edit-movies').data('movie-id');
        let movies = $(this).closest('.list-container');
        console.log(movieId);
        movies.find('.list-display').data('movie-id', movieId).toggle()
        movies.find('.list-edit').data('movie-id', movieId).toggle();

    })

    $('.project-icon').on("click", function() {
        $.ajax({
            method: "GET",
            url: "api/movies",
            success: renderMovies,
        });
    });

    $(document).on("click", '.delete-movies', function(event) {
        event.preventDefault();
        let movieId = $(this).closest('.delete-movies').data('movie-id');
        $.ajax({
            method:"DELETE",
            url: "api/movies/" + movieId,
            })
        $.ajax({
            method: "GET",
            url: "api/movies",
            success: renderMovies,
        });
        })
});

    function renderMovies(movieData) {
        console.log(movieData)
        console.log('hello')
        event.preventDefault();
        let listing = "";
        $('.form-row').empty();
        $('.all-listing').empty();
        $('.form-row').append(`
            <div class="col-md-12">
                <h1>Add some movies in the form below</h1>
            </div>
            <div class="row">
                <div class="col-sm-2"></div>
                <form class="movie-form">
                    <div class="col-sm-8">
                        <input type="text" class="title-input" placeholder="Title">
                        <input type="text" class="year-input" placeholder="Year">
                        <input type="text" class="director-input" placeholder="Director">
                        <input type="text" class="image-input" placeholder="Image URL">
                        <button type="submit" class="add-movie-button">Submit</button>
                    </div>
                </form>
                <div class="col-sm-2"></div>
            </div>
        `);
        movieData.forEach(function(lists) {
            listing += `
                <div class="list-container">
                <div class="col-sm-4 list-display" data-movie-id="${lists._id}">
                    <img class="movie-image" src="${lists.image}">
                    <div class="title-text list-text">Title: ${lists.title}</div>
                    <div class="release-text list-text">Release: ${lists.year}</div>
                    <div class="director-text list-text">Director: ${lists.director}</div>
                    <button class="edit-movies btn btn-primary" data-movie-id="${lists._id}" type="button">Edit</button>
                    <button class="delete-movies btn btn-danger" data-movie-id="${lists._id}" type="submit">Delete</button>
                </div>
                
                
                <div class="col-sm-4 list-edit" data-movie-id="${lists._id}">
                    <img class="movie-image" src="${lists.image}">
                    <form class="save-form">
                    <div class="title-text list-text">Title: <input class="title-edit" data-movie-id="${lists._id} type="text" value="${lists.title}"></div>
                    <div class="release-text list-text">Release: <input class="release-edit" data-movie-id="${lists._id} type="text" value="${lists.year}"></div>
                    <div class="director-text list-text">Director: <input class="director-edit" data-movie-id="${lists._id} type="text" value="${lists.director}"></div>
                    <button class="save-movies btn btn-primary" data-movie-id="${lists._id}" type="submit">Save</button>
                    <button class="delete-movies btn btn-danger" data-movie-id="${lists._id}" type="submit">Delete</button>
                    </form>
                </div>
                </div>`
        })
        $('.all-listing').append(listing);
    };

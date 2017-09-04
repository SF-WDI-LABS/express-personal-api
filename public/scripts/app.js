console.log("Sanity Check: JS is working!");

$(document).ready(function(){
    $(document).on("click", '.add-movie-button', function(event) {
        event.preventDefault()
        console.log("zzz")
        $.ajax({
            method: "POST",
            url: "/api/movies/",
            data: {
                title: $('.title-input').val(),
                year: $('.year-input').val(),
                director: $('.director-input').val(),
                image: $('.image-input').val(),
            },
            success: renderMovies,
        });
    });
    $('.project-icon').on("click", function() {
        $.ajax({
            method: "GET",
            url: "api/movies",
            success: renderMovies
        });
        console.log("success");
    });
});
    // function renderMultipleMovies(movieData) {
    //     movieData.forEach(function(movies) {
    //         renderMovies(movies)
    //     });
    // };
    function renderMovies(movieData) {
        console.log(movieData)
        event.preventDefault();
        let listing = "";
        $('.form-row').empty();
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
            listing += `<div class="row">
                <div class="col-sm-4">
                    ${lists._id}
                    <button class="delete-movies" type="button">Delete</button>
                </div>
            </div>`
        })
        $('.all-listing').append(listing);
    };

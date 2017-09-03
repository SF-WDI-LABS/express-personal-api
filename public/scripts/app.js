console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// your code

// Phrase 0: (Adding initial static elements via ajax)
// Add all the initial features static html element onto the site
// EX: buttons, forms, data, pictures,
// Setup event handlers for those and the possible function that go with each
// Phrase 1: (Routing Ajax using hardcoded data)
	// Setup ajax call and url path that those will lead
	// Setup the routes in server.js of what controller routes it should go 
	// and data they should get back
// After we get back the data, write templating function to render them
// on appropriate location at the page using jquery

// Phrase 0: (Adding initial static elements via ajax)
	

	// $.ajax({
	// 	method: "GET",
	// 	url: "/api/profile"
		
	// })
	// .then(function(data){
	// 	console.log("hello");
	// 	console.log(data);
	// 	renderIndex(data);

	// })
	// .catch(function(err){
	// 	console.log(err);
	// });

	function renderIndex(data){
		var profile = data.profile;
		// append the profile picture
		//$('.profile-pic').append()
	
		//$(".profile-pic").html(profile.githubProfileImage);
		$('.my-name').html(profile.name);

	}

	// Bind event handlers for the buttons I created
	$('#main-nav').on("click", ".add-book", addBookSubmit);
	$('#main-nav').on("click", ".delete-book", deleteBookSubmit);
	$('#main-nav').on("click", ".update-book", updateBookSubmit);

	function addBookSubmit(event){
		// Clear out the main content section
		// Generate a form to add content
		// on submit, save
		var $main_content = $('#main-content');
		// $main_content.empty();
		// $main_content.html(generateBookForm());
		var $side_form = $('.side-form');
		$side_form.show();
	}

	function deleteBookSubmit(event) {

	}

	function updateBookSubmit(event){

	}

	function generateBookForm(){
		return `
		<form method="" action="">
			<div class="card">
			<input type="file" class="card-img-top">
				<div class="card-body">
				Title or Caption: 
				<input type="text" class="card-title" name="story-title">
				Description:
				<input type="text" class="card-text" name="story-description">
				<button type="submit" class="btn btn-dark">Confirm</button>
				</div>
			</div>
		</form>

		`;

	}

	// Create book based on data received back from server
	function createBook(data){

	}

	function templateBook(data){

		var book = data;

		return `
		<div class="card">
		  <img class="card-img-top" src=${data.link} alt="Card image cap">
		  <div class="card-body">
		    <h4 class="card-title">${data.name}</h4>
		    <p class="card-text">${data.description}</p>
		    <a href="#" class="btn btn-dark">Go somewhere</a>
		  </div>
		</div>

		`;

	}


});





console.log("Sanity Check: JS is working!");
$(document).ready(function(){
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
	
	main();

	// The main apps being run when the doc is first loaded.
	// Outside of main are helper functions
	function main() {
		// Render dummpy data from seed.js when the webpage is first loaded
		$.ajax({
			method: "GET",
			url: "/story/index",
			success: renderStories,
		});

		// Bind event handlers on Add, Edit, and Delete buttons
		// &&  on side-forms
		var $main_nav = $('#main-nav');
		var $main_content = $('#main-content');
		$main_nav.on("click", ".add-book", show_side_form);
		$main_content.on("click", ".delete-book", deleteStoryBtn);
		$main_content.on("click", ".update-book", updateStoryBtn);
		var $side_bar = $('.side-bar');
		var $img_preview = $('.img-preview');
		
		$('.cancel-book').on("click", function(){
			$side_bar.slideToggle();
			$main_nav.show();
		});
		$('.clear-book').on("click", function(){
			$img_preview.empty();
		});
		// Preview images after user upload files
		// $('[name=story_link]').change(previewFile);
		
		$('.side-form').on("submit", function(e){
			e.preventDefault();
			var story = $(this).serialize();

			$.ajax({
				method: "POST",
				url: "/story/create",
				data: story,
			})
			.then(function(data){
				// When data is received, template the book and render
				// it on the page using template and css card
				$('#main-content').append(templateStory(data));

			}).catch(function(err){
				console.log(err);
			});
		});
	};


	// Preview img when file is uploaded
	// Will not work for video file atm.
	function previewFile(e){
			for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
			    var file = e.originalEvent.srcElement.files[i];
			    var img = document.createElement("img");
			    var reader = new FileReader();
			    reader.onloadend = function(event) {
			    	img.src = event.target.result;
			    };
			    $(img).css("width", "250px", "height", "165px");
			    reader.readAsDataURL(file);
			    $('.img-preview').empty();
			    $('.img-preview').append(img);
			}
	};

	// For all stories received from server,
	// create a html template for them and append to the page
	function renderStories(stories){
		var $main_content = $('#main-content');
		stories.forEach(function(story){
			$main_content.append(templateStory(story));
		});
	}

	function show_side_form(event){
		// Clear out the main content section
		// Generate a form to add content
		// on submit, save
		var $main_content = $('#main-content');
		// $main_content.empty();
		// $main_content.html(generateStoryForm());
		var $side_bar = $('.side-bar');
		$('#main-nav').hide();
		$side_bar.slideToggle();
	}

	function deleteStoryBtn(event) {
		var id = $(this).closest('.card').attr('id');
		$.ajax({
			method: "delete",
			url: "/story/delete/" + id,
		}).then(function(data){
			$(`#${id}`).remove();
		}).catch(function(err){ console.log(err)})
	};

	function updateStoryBtn(event){

	}

	function generateStoryForm(){
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
	function createStory(data){

	}

	function templateStory(story){
		return `
		<div class="card" id=${story._id}>
		  <img class="card-img-top" src=${story.link} alt="Card image cap">
		  <div class="card-body">
		    <h4 class="card-title">${story.name}</h4>
		    <p class="card-text">${story.description}</p>
		    <button type="button" class="edit-book btn btn-dark">Edit</button>
		    <button type="button" class="delete-book btn btn-dark">Delete</button>
		  </div>
		</div>
		`;
	}


});





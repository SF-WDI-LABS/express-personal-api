console.log("Sanity Check: JS is working!");
$(document).ready(function(){
	
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
		$main_content.on("click", ".edit-book", editStoryBtn);
		$main_content.on("click", ".update-book", updateStoryBtn);
		var $side_bar = $('.side-bar');
		var $img_preview = $('.img-preview');
		
		$('.cancel-story').on("click", function(){
			$side_bar.slideToggle();
			$main_nav.show();
		});
		$('.clear-story').on("click", function(){ $img_preview.empty(); });
		// Preview images after user upload files
		// $('[name=story_link]').change(previewFile);
		
		$('.side-form').on("submit", function(e){
			e.preventDefault();
			var story = $(this).serialize();
			$('.story_link .card-title .card-text').val("");
			$.ajax({
				method: "POST",
				url: "/story/create",
				data: story,
			})
			.then(function(new_story){
				// When data is received, template the book and slowly render
				// it on the page using template and css card
				// Then clear out the form upon success
				$('#main-content').prepend(templateStory(new_story, "none"));
				$(`#${new_story._id}`).fadeIn(1000);
				$('[name=form_link],[name=form_title],[name=form_description]').val("");
			}).catch(function(err){
				console.log(err);
			});
		});
	};

	// Preview img when file is uploaded
	// Will not work for video file atm.
	// Its not being used atm but will be in future projects
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
			var new_story = templateStory(story, "show");
			$main_content.prepend(new_story);
		});
	}

	// Clear out the main content section
	// Generate a form to add content
	// on submit, save
	function show_side_form(event){
		var $main_content = $('#main-content');
		var $side_bar = $('.side-bar');
		$('#main-nav').hide();
		$side_bar.slideToggle();
	}

	// Delete story from db and from front-end rendering
	function deleteStoryBtn(event) {
		var id = $(this).closest('.card').attr('id');
		$.ajax({
			method: "delete",
			url: "/story/delete/" + id,
		}).then(function(data){
			$(`#${id}`).remove();
		}).catch(function(err){ console.log(err);})
	};

	// Toggle input form and display update button 
	// When update is clicked, update db and rerender page
	function editStoryBtn(event){
		$(this).parents('.card').find('.toggle').toggle();
	}

	function updateStoryBtn(event){
	//Take whats in the input story_description and story_name field and send a put request
		var body = {
			name: $(this).parents('.card-body').find('[name=story_name]').val(),
			description: $(this).parents('.card-body').find('[name=story_description]').val(),
		};
		var id = $(this).parents('.card').attr('id');
		$.ajax({
			method: "put",
			url: "story/update/" + id,
			data: body,
		}).then(function(update_story){
			// Update the front-end rendering after db stored correctly
			var card_div = $(`#${id}`);
			card_div.html(templateStory(update_story, "show"));
		}).catch(function(err){console.log(err);});
	}

	// Create a card template from user input
	function templateStory(story, display){
		return `	
		<div class="card" style="display: ${display}" id=${story._id}>
			  <img class="card-img-top" src=${story.link} alt="Card image cap">
			  <div class="card-body">
			    <h4 class="card-title toggle">${story.name}</h4>
			    <input type="text" name="story_name" class="card-title toggle" style="display: none" value="${story.name}">
			    <p class="card-text toggle">${story.description}</p>
			    <textarea type="text" name="story_description" class="card-text toggle" style="display: none" >${story.description}</textarea>
			    <button type="button" class="delete-book btn btn-dark">Delete</button>
			    <button type="button" class="edit-book btn btn-dark toggle">Edit</button>
			    <button type="button" class="update-book btn btn-dark toggle" style="display: none">Update</button>
			  </div>	
		</div>
		`;
	}

});

console.log("Sanity Check: JS is working!");
$(document).ready(function(){
	
	main();

	// The main apps being run when the doc is first loaded.
	// Outside of main are helper functions
	function main() {
		// Render all database record to page. Its currently empty until you run seed.js
		//or click the add seed button, which submit request to one of my api, submit 
		// all those data to the db, store them, and make another ajax call to rerender them.
		renderDBstoPage();

		// Create a new copy set of stories on the page based on data i received from
		// api/images, with a click of a button.
		$('.add-seed').on("click", addSeedData);
		function addSeedData(){
			$.ajax({
				method: "GET",
				url: "/api/images",
			}).then(function(data){
				var $main_content = $('#main-content');
				data.LA_trip.forEach(function(new_story){
					// for data I get back, create a entry in the database by
					// passing in as in the format from the submit form, hence the 
					// form_title, form_description, form_link, instead of just title, etc...
					// After all data are created from endpoint. call /story/index page
					// to render seed to the page
					var story = {
						form_title : new_story.name,
						form_link: new_story.link,
						form_description: new_story.description,
					};
					$.ajax({
						method: "POST",
						url: "/story/create",
						data: story,
					}).then(function(created_story){
						var $main_content = $('#main-content');
						var new_story = templateStory(created_story, "show");
						$main_content.prepend(new_story);
					})
					.catch(function(err){console.log(err);});
				});
				// Use index to render all data from server to the page
			}).catch(function(err){console.log(err);});
		};

		// make call to index page and render all database record to html page
		function renderDBstoPage(){
			$.ajax({
				method: "GET",
				url: "/story/index",
				success: renderStories,
			});
		};

		// Bind event handlers on Add, Edit, and Delete buttons
		// &&  on side-forms
		var $main_nav = $('#main-nav');
		var $main_content = $('#main-content');
		$main_nav.on("click", ".add-story", show_side_form);
		$main_content.on("click", ".delete-story", deleteStoryBtn);
		$main_content.on("click", ".edit-story", editStoryBtn);
		$main_content.on("click", ".update-story", updateStoryBtn);
		var $side_bar = $('.side-bar');
		var $img_preview = $('.img-preview');
		
		$('.cancel-story').on("click", function(){
			$side_bar.slideToggle();
			$main_nav.show();
		});
		$('.side-form').on("submit", function(e){
			e.preventDefault();
			var story = $(this).serialize();
			$('.story_link .card-title .card-text').val("");
			console.log(story);
			$.ajax({
				method: "POST",
				url: "/story/create",
				data: story,
			})
			.then(function(new_story){
				// When data is received, template the story and slowly render
				// it on the page using template and css card
				// Then clear out the form upon success
				$('#main-content').prepend(templateStory(new_story, "none"));
				$(`[data-id=${new_story._id}]`).fadeIn(1200);
				$('[name=form_link],[name=form_title],[name=form_description]').val("");
			}).catch(function(err){
				console.log(err);
			});
		});
	};

	// For all stories received from server,
	// create a html template for them and append to the page
	function renderStories(stories){
		if(stories.length === 0) return;
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
		var id = $(this).closest('.card').data('id');
		$.ajax({
			method: "delete",
			url: "/story/delete/" + id,
		}).then(function(data){
			$(`[data-id=${id}]`).remove();
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
		var id = $(this).parents('.card').data('id');
		$.ajax({
			method: "put",
			url: "story/update/" + id,
			data: body,
		}).then(function(update_story){
			// Update the front-end rendering after db stored correctly
			var story_div = $(`div[data-id=${id}]`);
			story_div.html(templateStory(update_story, "show"));
			// Theres a hidden card element behind the 1 that we just updated
			// need to insert updated_story before the parent before we can remove parent 
			var nodes = $(`div[data-id=${id}]`);
			nodes.eq(1).insertBefore(nodes.eq(0));
			nodes.eq(0).remove();

		}).catch(function(err){console.log(err);});
	}

	// Create a card template from user input
	// With a hidden input field to toggle when user click 'edit'
	function templateStory(story, display){
		return `	
		<div class="card" style="display: ${display}" data-id=${story._id}>
			  <img class="card-img-top" src=${story.link} alt="Card image cap">
			  <div class="card-body">
			    <h4 class="card-title toggle">${story.name}</h4>
			    <input type="text" name="story_name" class="card-title toggle" style="display: none" value="${story.name}">
			    <p class="card-text toggle">${story.description}</p>
			    <textarea type="text" name="story_description" class="card-text toggle" style="display: none" >${story.description}</textarea>
			    <button type="button" class="delete-story btn btn-dark">Delete</button>
			    <button type="button" class="edit-story btn btn-dark toggle">Edit</button>
			    <button type="button" class="update-story btn btn-dark toggle" style="display: none">Update</button>
			  </div>	
		</div>
		`;
	}

});

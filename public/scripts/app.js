console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // initial ajax call to bring back all profiles to create the SRP // might need to wrap this up into an on click event
  $.ajax({
    method: 'GET',
    url: '/api/searchpage',
  })
  .then(function(allProfileData){
    renderSearchResults(allProfileData)
  });

  // clicking on a search results card to render the profile
  $('#search-results').on('click','.search-card-header', renderProfileFromSrp)

  // click on the back to srp span to go back to the srp
  $('.back-to-srp-span').on('click', reRenderSrp);

  // edit button parent/child association - on the #user-profile, when you click on the it, the .edit-header is selected (which is the pencil) and the editProfileHeader function is called
  $('#user-profile').on('click', '.edit-input-header', editProfileHeader);
  // on save (when the save pencil icon is clicked) the user-profile is saved
  $('#user-profile').on('click', '.edit-save-header', saveProfileHeader);

  $('.add-new-user-button').on('click', function() {
    console.log('modal clicked')
     $('#add-user').modal();
  });

  $('.save-new-user').on('click', createNewUser);

  //edit button parent/child asspoications

  // $('#user-profile').on('click', '.edit-about-me', editProfile);
  //
  // $('#user-profile').on('click', '.edit-social-network', editProfile);
});

// name: String,
// userName: String,
// image: String,
// title: String,
// workPlace: String,
// quote: String,
// aboutMe: String,
// socialNetwork: [String],
// markedForDeletion: Boolean,

let createNewUser = function() {
  console.log('hi')

  // get the profileHeader label and once after you get that
  // let createNewUserProfileHeader = $(this).closest('#profile-information');

  // go and get each of the value from the input field. The initial value of each field was populated automatically by using the 'value=' in the input tag of the html
  let newProfileHeaderName = $('.modal-input-for-profile-name').val();
  let newProfileHeaderTitle = $('.modal-input-for-profile-title').val();
  let newProfileHeaderWorkpalce = $('.modal-input-for-profile-workPlace').val();
  let newProfileHeaderQuote = $('.modal-input-for-profile-quote').val();
  let newProfileHeaderImg ='/images/userimages/' +  $('.modal-input-for-file').val().split('\\').pop();
  // removes the fakepath $('.modal-input-for-file').val().split('\\').pop()
  let profileImg = ($('.modal-input-for-file').val().split('\\').pop());

  let newProfileHeaderData = {
    name: newProfileHeaderName,
    image: newProfileHeaderImg,
    title: newProfileHeaderTitle,
    workPlace: newProfileHeaderWorkpalce,
    quote: newProfileHeaderQuote,
    markedForDeletion: false,
    socialNetwork: ['',''],
  };
  console.log('THIS IS NEW PROFILE HEADER', newProfileHeaderData);


  $.ajax({
    method: 'POST',
    url: `/api/searchpage`,
    data: newProfileHeaderData,
  })
  .then(function(newlyCreatedProfileData) {
    console.log('DATA returned from createNewUser', newlyCreatedProfileData);
    // send back the updated data do can pass it through a similar render function again. This time will have another function b/c one is coming from the SRP and the other is coming from the profile page
    renderProfileAfterEdit(newlyCreatedProfileData);

  })
  .catch(function(err) {
    console.log('ERROR during the createNewUser returned data', err);
  });
};

let renderProfileFromSrp = function() {
  let currentProfileId
  currentProfileId = $(this).closest('.search-card-header').attr('data-profile-id');
  console.log('Profile ID CLICKED FROM SRP', currentProfileId)


  $.ajax({
    method: 'GET',
    url: `/api/searchpage/${currentProfileId}`
  })
  .then(function(currentProfileData) {
    console.log('THIS IS THE RENDER PROFILE WORKING', currentProfileData.socialNetwork)
    // remove the search stuff first with a fadeOut
    $('.search').fadeOut(300, function() {
      $(this).remove();
    });
    $('.back-to-srp-span').toggle()


    let headerAndAboutMeHtml = `
    <!-- START OF THE PROFILE HEADER DATA  -->
    <div id="profile-information" data-profile-id='${currentProfileData._id}'>

    <div class="container profile header">
      <div class="row valign-wrapper profile-header">
        <div class="col s4 profile-img">
          <img class="circle responsive-img user-img" src='${currentProfileData.image}'>
        </div>
        <div class="col s8 user-info">
          <div>
            <div class='right-align'>
              <img class='edit-icon edit-input-header' src='/images/assets/edit.svg'>
              <img class='edit-icon edit-save-header' src='/images/assets/edit.svg'>
            </div>
            <div>
             <h1 class='h1-name' name='username'>${currentProfileData.name}</h1>
               <input class='input-for-profile-header input-for-profile-name' id='input-name' value='${currentProfileData.name}'></input>
               <label for="input-name" class='label-profile-header'>Name</label>
           </div>
          </div>
          <div>
            <span class='title profile-header-db-info' name='title' value=''>${currentProfileData.title}</span>
              <input class='input-for-profile-header input-for-profile-title' id='input-title' value='${currentProfileData.title}'></input>
              <label for="input-title" class='label-profile-header'>Title</label>
            <span class='profile-span at-span' name='' value=''>at</span>
            <span class='profile-header-db-info place-of-work' name='place-of-work' value=''>${currentProfileData.workPlace}</span>
              <input class='input-for-profile-header input-for-profile-workPlace' id='input-place-of-work' value='${currentProfileData.workPlace}'></input>
              <label for="input-place-of-work" class='label-profile-header'>Place of Work</label>
          </div>
          <div>
             <span class='profile-header-db-info quote' name='quote' value=''>${currentProfileData.quote}</span>
             <textarea class='materialize-textarea input-for-profile-header textarea-for-profile-quote' id='textarea-quote' value=''>${currentProfileData.quote}</textarea>
             <label for="textarea-quote" class='label-profile-header'>Quote</label>

          </div>
        </div>
      </div>
    </div>
      <!-- END OF THE PROFILE HEADER DATA  -->

       <div id="about-me"></div>

       <!-- START ABOUT ME  -->
       <div class="container profile about-me">
         <div class="row about-me">
           <div class="col s12 about-me-info">
             <div class='right-align'>
               <img class='edit-icon edit-input-header' src='/images/assets/edit.svg'>
               <img class='edit-icon edit-save-header' src='/images/assets/edit.svg'>
             </div>
             <div>
               <h2 class='aboutme' name='aboutme' value=''>About Me</h2>
             </div>
             <div>
               <p>${currentProfileData.aboutMe}</p>
             </div>
           </div>
         </div>
       </div>

      <!-- END ABOUT ME  -->
      <div id="social-network" class='profile'></div>
      `

      // if they have both
      let socialHtml
        // console.log(currentProfileData.socialNetwork[0] !== '');
      if (currentProfileData.socialNetwork[0] !== '' && currentProfileData.socialNetwork[1] !== '') {
        // let socialWithBothHtml
        socialHtml = `
          <!-- START SOCIAL  -->
          <div class="container profile social-network">
          <div class="row social">
            <div class="col s12 social-info">
              <div class='right-align'>
                <img class='edit-icon edit-input-header' src='/images/assets/edit.svg'>
                <img class='edit-icon edit-save-header' src='/images/assets/edit.svg'>
              </div>
              <div>
                <h2 class='aboutme' name='aboutme' value=''>Social Network</h2>
                <a href='${currentProfileData.socialNetwork[0]}' target="_blank"><img class="social-img" src='/images/social/linkedin.png'></a>
                <a href='${currentProfileData.socialNetwork[1]}' target="_blank"><img class="social-img" src='/images/social/github.png'></a>
            </div>
          </div>
          </div>
          </div>
          <!-- END SOCIAL  -->
          </div>
          <!-- ONE USER PROFILE  -->
        `
        // if they only have linkedIn
      } else if ( currentProfileData.socialNetwork[0] !== '' && currentProfileData.socialNetwork[1] === '')  {

          // let socialWithJustLinkedInHtml
          socialHtml = `
          <!-- START SOCIAL  -->
          <div class="container profile social-network">
            <div class="row social">
              <div class="col s12 social-info">
                <div class='right-align'>
                  <img class='edit-icon edit-input-header' src='/images/assets/edit.svg'>
                  <img class='edit-icon edit-save-header' src='/images/assets/edit.svg'>
                </div>
                <div>
                  <h2 class='aboutme' name='aboutme' value=''>Social Network</h2>
                  <a href='${currentProfileData.socialNetwork[0]}' target="_blank"><img class="social-img" src='/images/social/linkedin.png'></a>
                </div>
              </div>
            </div>
          </div>
          <!-- END SOCIAL  -->
          </div>
          <!-- ONE USER PROFILE  -->
          `
          // if they only have gitHub
      } else if ( currentProfileData.socialNetwork[0] === '' && currentProfileData.socialNetwork[1] !== '' ) {
        //  let socialWithJustGitHubHtml
         socialHtml = `
          <!-- START SOCIAL  -->
          <div class="container profile social-network">
            <div class="row social">
              <div class="col s12 social-info">
                <div class='right-align'>
                  <img class='edit-icon edit-input-header' src='/images/assets/edit.svg'>
                  <img class='edit-icon edit-save-header' src='/images/assets/edit.svg'>
                </div>
                <div>
                  <h2 class='aboutme' name='aboutme' value=''>Social Network</h2>
                  <a href='${currentProfileData.socialNetwork[1]}' target="_blank"><img class="social-img" src='/images/social/github.png'></a>
              </div>
            </div>
          </div>
          </div>
          <!-- END SOCIAL  -->
          </div>
          <!-- ONE USER PROFILE  -->
        `
      }
      // load one at a time
      $('#user-profile').append(headerAndAboutMeHtml);
      $('#social-network').append(socialHtml);
    });
    // let backButton = $(this).closest('#back-to-srp');
    // backButton.find('.back-to-srp-span').toggle();



};

// render all the search results cards into one page by passing back the initial ajax call and sending each value into the renderOneSearchResultCard function
let renderSearchResults = function (searchResults) {
  console.log('renderSearchResults - making all the cards', searchResults);
  searchResults.forEach(function(searchResult) {
    renderOneSearchResultCard(searchResult);
  });
}

// render one searchResults card - takes one value and appends it to the correct spot in the HTML
let renderOneSearchResultCard = function (searchResult) {
  console.log('renderOneSearchResultCard - bring back all profiles', searchResult);
  let srpCardHtml = `
  <div class="container search">
    <div class="row valign-wrapper search-card-header" data-profile-id='${searchResult._id}'>
      <div class="col s4 profile-img">
        <img class="circle responsive-img user-img" src='${searchResult.image}'>
      </div>
      <div class="col s8 user-info">
        <div>
          <h1 class='name search-card-h1' name='username' value=''>${searchResult.name}</h1>
        </div>
        <div>
          <span class='title search-card-span' name='title' value=''>${searchResult.title}</span>
          <span class='search-card-span' name='' value=''>at</span>
          <span class='search-card-span place-of-work' name='place-of-work' value=''>${searchResult.workPlace}</span>
        </div>
        <div>
           <span class='search-card-span quote' name='quote' value=''>${searchResult.quote}</span>
        </div>
      </div>
    </div>
  </div>
  `
  $('#search-results').append(srpCardHtml).hide().fadeIn(100);
};

// re-render when going from the profile page back to the SRP page
let reRenderSrp = function(){
  $.ajax({
    method: 'GET',
    url: '/api/searchpage',
  })
  .then(function(allProfileData){
    renderSearchResults(allProfileData)
    $('.profile').remove();
  });
  $('.back-to-srp-span').toggle()
};

// ability to click on the pencil and open up the fields for edit
let editProfileHeader = function (e) {
  console.log('EDIT HEADER-ICON was clicked!');
  let currentProfileId = $(this).closest('#profile-information').attr('data-profile-id');
  console.log('EDIT ICON CLICKED AND THIS IS THE PROFILE', currentProfileId)

  // opens up the 4 text fields
  $('.input-for-profile-header').toggle();
  // removes the 'at' inbetween Title and workPlace
  $('.at-span').toggle();
  // removes the name in the h1
  $('.h1-name').toggle();
  // removes all the info from spans that is from the DB
  $('.profile-header-db-info').toggle();
  // shows the table under each of the input / text box area
  $('.label-profile-header').toggle();
  // hides the edit-header pencil that is currently showing and gets rid of that while showing the new one
  $('.edit-input-header').toggle();
  $('.edit-save-header').toggle();
};

// ability to edit the field and save the fields
let saveProfileHeader = function(e) {
  console.log('SAVE HEADER ICON WAS CLICKED')
  let currentProfileId = $(this).closest('#profile-information').attr('data-profile-id');
  console.log('SAVE ICON CLICKED AND THIS IS THE PROFILE ID', currentProfileId)


  // get the profileHeader label and once after you get that
  let editedProfileHeader = $(this).closest('#profile-information');

  // go and get each of the value from the input field. The initial value of each field was populated automatically by using the 'value=' in the input tag of the html
  let editedProfileHeaderName = editedProfileHeader.find('.input-for-profile-name').val();
  let editedProfileHeaderTitle = editedProfileHeader.find('.input-for-profile-title').val();
  let editedProfileHeaderWorkpalce = editedProfileHeader.find('.input-for-profile-workPlace').val();
  let editedProfileHeaderQuote = editedProfileHeader.find('.textarea-for-profile-quote').val();

  // create the data object to send back
  let editedProfileHeaderData = {
    name: editedProfileHeaderName,
    title: editedProfileHeaderTitle,
    workPlace: editedProfileHeaderWorkpalce,
    quote: editedProfileHeaderQuote,

  };
  console.log('THIS IS THE DATA TO BE SENT BACK AFTER EDIT', editedProfileHeaderData);

  $.ajax({
    method: 'PUT',
    url: `/api/searchpage/${currentProfileId}`,
    data: editedProfileHeaderData,
  })
  .then(function(updatedEditedData) {
    console.log('DATA returned from editedProfileHeaderData', updatedEditedData);
    // send back the updated data do can pass it through a similar render function again. This time will have another function b/c one is coming from the SRP and the other is coming from the profile page
    renderProfileAfterEdit(updatedEditedData);
  })
  .catch(function(err) {
    console.log('ERROR during the editedProfileHeaderData returned data', err);
  });
  // closes the save icon
  $('.edit-save-header').toggle();

  // closes the four header icons
  $('.input-for-profile-header').toggle();

  // put the 'AT' back inbetween Title and workPlace
  $('.at-span').toggle();

  // put the name back into the h1
  $('.h1-name').toggle();

  // puts all the info from spans that is from the DB
  $('.profile-header-db-info').toggle();

  // gets rid of all the labels
  $('.label-profile-header').toggle();

  // opens the edit icon
  $('.edit-input-header').toggle();

  // bring back the 'back' span
  $('.back-to-srp-span').toggle();



}

// ability to rerender the profril AFTER edit
let renderProfileAfterEdit = function(updatedEditedData) {
  let currentProfileId = updatedEditedData._id
  console.log(updatedEditedData._id)
  $('.profile').remove()
  $.ajax({
    method: 'GET',
    url: `/api/searchpage/${currentProfileId}`
  })
  .then(function(currentProfileData) {
    console.log('THIS IS THE RENDER PROFILE WORKING', currentProfileData.socialNetwork)
    // remove the search stuff first with a fadeOut
    $('.search').fadeOut(300, function() {
      $(this).remove();
    });
    $('.back-to-srp-span').toggle()

    let headerAndAboutMeHtml = `
    <!-- START OF THE PROFILE HEADER DATA  -->
    <div id="profile-information" data-profile-id='${currentProfileData._id}'>

    <div class="container profile header">
      <div class="row valign-wrapper profile-header">
        <div class="col s4 profile-img">
          <img class="circle responsive-img user-img" src='${currentProfileData.image}'>
        </div>
        <div class="col s8 user-info">
          <div>
            <div class='right-align'>
              <img class='edit-icon edit-input-header' src='/images/assets/edit.svg'>
              <img class='edit-icon edit-save-header' src='/images/assets/edit.svg'>
            </div>
            <div>
             <h1 class='h1-name' name='username'>${currentProfileData.name}</h1>
               <input class='input-for-profile-header input-for-profile-name' id='input-name' value='${currentProfileData.name}'></input>
               <label for="name" class='label-profile-header'>Name</label>
           </div>
          </div>
          <div>
            <span class='title profile-header-db-info' name='title' value=''>${currentProfileData.title}</span>
              <input class='input-for-profile-header input-for-profile-title' id='input-title' value='${currentProfileData.title}'></input>
              <label for="input-title" class='label-profile-header'>Title</label>
            <span class='profile-span at-span' name='' value=''>at</span>
            <span class='profile-header-db-info place-of-work' name='place-of-work' value=''>${currentProfileData.workPlace}</span>
              <input class='input-for-profile-header input-for-profile-workPlace' id='input-place-of-work' value='${currentProfileData.workPlace}'></input>
              <label for="input-place-of-work" class='label-profile-header'>Place of Work</label>
          </div>
          <div>
             <span class='profile-header-db-info quote' name='quote' value=''>${currentProfileData.quote}</span>
             <textarea class='materialize-textarea input-for-profile-header textarea-for-profile-quote' id='textarea-quote' value=''>${currentProfileData.quote}</textarea>
             <label for="textarea-quote" class='label-profile-header'>Quote</label>

          </div>
        </div>
      </div>
    </div>
      <!-- END OF THE PROFILE HEADER DATA  -->

       <div id="about-me"></div>

       <!-- START ABOUT ME  -->
       <div class="container profile about-me">
         <div class="row about-me">
           <div class="col s12 about-me-info">
             <div class='right-align'>
               <img class='edit-icon edit-input-header' src='/images/assets/edit.svg'>
               <img class='edit-icon edit-save-header' src='/images/assets/edit.svg'>
             </div>
             <div>
               <h2 class='aboutme' name='aboutme' value=''>About Me</h2>
             </div>
             <div>
               <p>${currentProfileData.aboutMe}</p>
             </div>
           </div>
         </div>
       </div>

      <!-- END ABOUT ME  -->
      <div id="social-network" class='profile'></div>
      `

      // if they have both
      let socialHtml
        // console.log(currentProfileData.socialNetwork[0] !== '');
      if (currentProfileData.socialNetwork[0] !== '' && currentProfileData.socialNetwork[1] !== '') {
        // let socialWithBothHtml
        socialHtml = `
          <!-- START SOCIAL  -->
          <div class="container profile social-network">
          <div class="row social">
            <div class="col s12 social-info">
              <div class='right-align'>
                <img class='edit-icon edit-input-header' src='/images/assets/edit.svg'>
                <img class='edit-icon edit-save-header' src='/images/assets/edit.svg'>
              </div>
              <div>
                <h2 class='aboutme' name='aboutme' value=''>Social Network</h2>
                <a href='${currentProfileData.socialNetwork[0]}' target="_blank"><img class="social-img" src='/images/social/linkedin.png'></a>
                <a href='${currentProfileData.socialNetwork[1]}' target="_blank"><img class="social-img" src='/images/social/github.png'></a>
            </div>
          </div>
          </div>
          </div>
          <!-- END SOCIAL  -->
          </div>
          <!-- ONE USER PROFILE  -->
        `
        // if they only have linkedIn
      } else if ( currentProfileData.socialNetwork[0] !== '' && currentProfileData.socialNetwork[1] === '')  {

          // let socialWithJustLinkedInHtml
          socialHtml = `
          <!-- START SOCIAL  -->
          <div class="container profile social-network">
            <div class="row social">
              <div class="col s12 social-info">
                <div class='right-align'>
                  <img class='edit-icon edit-input-header' src='/images/assets/edit.svg'>
                  <img class='edit-icon edit-save-header' src='/images/assets/edit.svg'>
                </div>
                <div>
                  <h2 class='aboutme' name='aboutme' value=''>Social Network</h2>
                  <a href='${currentProfileData.socialNetwork[0]}' target="_blank"><img class="social-img" src='/images/social/linkedin.png'></a>
                </div>
              </div>
            </div>
          </div>
          <!-- END SOCIAL  -->
          </div>
          <!-- ONE USER PROFILE  -->
          `
          // if they only have gitHub
      } else if ( currentProfileData.socialNetwork[0] === '' && currentProfileData.socialNetwork[1] !== '' ) {
        //  let socialWithJustGitHubHtml
         socialHtml = `
          <!-- START SOCIAL  -->
          <div class="container profile social-network">
            <div class="row social">
              <div class="col s12 social-info">
                <div class='right-align'>
                  <img class='edit-icon edit-input-header' src='/images/assets/edit.svg'>
                  <img class='edit-icon edit-save-header' src='/images/assets/edit.svg'>
                </div>
                <div>
                  <h2 class='aboutme' name='aboutme' value=''>Social Network</h2>
                  <a href='${currentProfileData.socialNetwork[1]}' target="_blank"><img class="social-img" src='/images/social/github.png'></a>
              </div>
            </div>
          </div>
          </div>
          <!-- END SOCIAL  -->
          </div>
          <!-- ONE USER PROFILE  -->
        `
      } ;
      // load one at a time
      $('#user-profile').append(headerAndAboutMeHtml);
      $('#social-network').append(socialHtml);
    });
    // let backButton = $(this).closest('#back-to-srp');
    // backButton.find('.back-to-srp-span').toggle();
};

// set up click event listener for the icon that is attached to the parent class for the edit inter-communication

// on click make the inputted fields visible and the labels visible
// hide the word AT
// take the values fromt he spans and put them into the correct box













// let renderProfile = function (profile) {
//   console.log('renderProfile', profile);
// };

// create database

// create seedfile

// GET-1 - renderSearchResults => on load of the page what to be able to render the search results page which loads the 10 people in the database
  // append profileSRP from the SRP section
  // fill in the SRP


// POST createNewUser => able to create a new user on the SRP and then render that new person

// GET (SEND user ID) and renderProfile need to be able to click on a person, take that id and route them to a profile page

// PUT able to update the user on the renderProfile page (able to update each spot individually)

// DELETE able to 'hit the delete flag' and not show up the user anymore vs actually deleting their information

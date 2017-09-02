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

  $('#search-results').on('click','.search-card-header', renderProfile)
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

let renderProfile = function() {
  let currentProfileId = $(this).closest('.search-card-header').attr('data-profile-id');
  console.log('Profile ID CLICKED', currentProfileId)


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
              <img class='edit-icon' src='/images/assets/edit.svg'>
            </div>
            <div>
             <h1 class='name' name='username' value=''>${currentProfileData.name}</h1>
           </div>
          </div>
          <div>
            <span class='profile-span title' name='title' value=''>${currentProfileData.title}</span>
            <span class='profile-span' name='' value=''>at</span>
            <span class='profile-span place-of-work' name='place-of-work' value=''>${currentProfileData.workPlace}</span>
          </div>
          <div>
             <span class='profile-span quote' name='quote' value=''>${currentProfileData.quote}</span>
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
               <img class='edit-icon' src='/images/assets/edit.svg'>
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

      <div id="social-network"></div>
      `
      let socialHtml
      // if they have both
        console.log(currentProfileData.socialNetwork[0] !== '');
      if (currentProfileData.socialNetwork[0] !== '' && currentProfileData.socialNetwork[1] !== '') {
        // let socialWithBothHtml
        socialHtml = `
          <!-- START SOCIAL  -->
          <div class="container profile social-network">
          <div class="row social">
            <div class="col s12 social-info">
              <div class='right-align'>
                <img class='edit-icon' src='/images/assets/edit.svg'>
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
                  <img class='edit-icon' src='/images/assets/edit.svg'>
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
                  <img class='edit-icon' src='/images/assets/edit.svg'>
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
  $('#search-results').append(srpCardHtml);
};



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

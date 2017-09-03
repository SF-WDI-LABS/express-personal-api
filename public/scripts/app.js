console.log("Sanity Check: JS is working!");

$(document).ready(function(){

$.ajax({
  method: 'GET',
  url: '/api/birds',
})
.then(function(birds) {
  if (birds.length !== 0)
    renderAllBirds(birds);
});

//adding a bird
$("#bird-form form").on("submit", function(e) {
  e.preventDefault();
  console.log("app.js received submit button event");
  let birdData = $(this).serialize();
  console.log(`birdData: ${birdData}`);

  // $.ajax({
  //   method: "POST",
  //   url: "/api/birds",
  //   data: birdData,
  // })
  // .then(function(addedBird) {
  //   renderBird(addedBird);
  // })
  // .catch(function(err) {
  //   console.log(err);
  // });

  $.post("/api/birds", birdData, function(addedBird) {
    console.log(`addedBird: ${addedBird}`);
    renderBird(addedBird);
  });
  $(this).trigger("reset");
}); //$("#bird-form form").on("submit", function(e) {

function renderAllBirds(birds) {
  birds.forEach(renderBird);
}

function renderBird(bird) {
  console.log("entering renderBird()");

  let htmlElem = `    <div class="row bird">
        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 image-container">
          <img class="image" src="../../${bird.photo1}" alt="">
        </div>

        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 image-container">
          <img class="image" src="../../${bird.photo2}" alt="">
        </div>

        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 info-container">
          <ul class="list-group">
            <li class="list-group-item">
              <h4 class='inline-header'>Bird Name:</h4>
              <span class='bird-name'>${bird.name}</span>
            </li>

            <li class="list-group-item">
              <h4 class='inline-header'>Bird Type:</h4>
              <span class='bird-type'>${bird.type}</span>
            </li>

            <li class="list-group-item">
              <h4 class='inline-header'>Comments:</h4>
              <span class='bird-comments'>${bird.comments}</span>
            </li>

            <li class="list-group-item">
              <h4 class="inline-header">Learn more:</h4>
              <a href="${bird.url}">${bird.urlName}</a>
            </li>
          </ul>
        </div>
      </div>
      `;

  $("#birds").append(htmlElem);
} //function renderBird(bird) {



}); //$(document).ready(function(){

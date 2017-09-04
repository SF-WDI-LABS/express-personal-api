console.log("Sanity Check: JS is working!");

$(document).ready(function(){

//get all birds from db after the page reload
$.ajax({
  method: 'GET',
  url: '/api/birds',
})
.then(function(birds) {
  if (birds.length !== 0)
    renderAllBirds(birds);
});

//adding a bird
handleAddBird

$("#bird-form form").on("submit", handleAddBird);


// $("#bird-form form").on("submit", function(e) {
//   e.preventDefault();
//   console.log("app.js received submit button event");
//   let birdData = $(this).serialize();
//   console.log(`birdData: ${birdData}`);
//
//   $.post("/api/birds", birdData, function(addedBird) {
//     console.log(`addedBird: ${addedBird}`);
//     renderBird(addedBird);
//   });
//   $(this).trigger("reset");
// }); //$("#bird-form form").on("submit", function(e) {



//handling edit button click for editing a bird
$("#birds").on("click", ".edit-bird", handelEditBird);

//handling save button click for editing a bird
$("#birds").on("click", ".save-bird", handleSaveBird);

//handling delete button of a bird
$("#birds").on("click", ".delete-bird", handleDeleteBird);





function renderAllBirds(birds) {
  birds.forEach(renderBird);
}

function renderBird(bird) {
  console.log("entering renderBird()");

  let htmlElem = `
  <div class="panel panel-default bird" data-bird-id=${bird._id}>
    <div class="panel-body">
      <div class="row">
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
    </div>

    <div class="panel-footer">
      <button class="btn btn-info edit-bird">Edit Bird</button>
      <button class="btn btn-success save-bird hidden">Save Changes</button>
      <button class="btn btn-danger delete-bird">Delete Bird</button>
    </div>
  </div>
      `;

  $("#birds").append(htmlElem);
} //function renderBird(bird) {

function handleAddBird(e) {
  e.preventDefault();
  console.log("app.js received submit button event");
  let birdData = $(this).serialize();
  console.log(`birdData: ${birdData}`);

  $.post("/api/birds", birdData, function(addedBird) {
    console.log(`addedBird: ${addedBird}`);
    renderBird(addedBird);

    $("[data-bird-id=" + addedBird._id + "]")[0].scrollIntoView();
  });
  $(this).trigger("reset");
}

function handelEditBird(e) {
  e.preventDefault();
  let birdId = $(this).closest(".bird").data("bird-id");
  let $bird = $(this).closest(".bird");
  console.log(`handelEditBird: birdId = ${birdId}`);

  //toggle the save & edit button
  $bird.find(".save-bird").toggleClass("hidden");
  $bird.find(".edit-bird").toggleClass("hidden");

  //change the bird name in the span to become input with the value of the current bird name
  let birdName = $bird.find(".bird-name").text();
  $bird.find(".bird-name").html(`<input class="edit-bird-name" value="${birdName}"></input>`);

  let birdType = $bird.find(".bird-type").text();
  $bird.find(".bird-type").html(`<input class="edit-bird-type" value="${birdType}"></input>`);

  let birdComments = $bird.find(".bird-comments").text();
  $bird.find(".bird-comments").html(`<input class="edit-bird-comments" value="${birdComments}"></input>`);
  //now just wait for the usr to edit the above 3 inputs and click the save button that has class save-bird
}

function handleSaveBird(e) {
  e.preventDefault();

  let birdId = $(this).closest(".bird").data("bird-id");
  let $bird = $(this).closest(".bird");

  //toggle the save & edit button
  $bird.find(".save-bird").toggleClass("hidden");
  $bird.find(".edit-bird").toggleClass("hidden");

  let newBirdData = {
    name: $bird.find(".edit-bird-name").val(),
    type: $bird.find(".edit-bird-type").val(),
    comments: $bird.find(".edit-bird-comments").val(),
  };

  console.log(`handleSaveBird() birdId = ${birdId}, newBirdData = ${newBirdData}`);
  console.log(`url: /api/birds/${birdId}`);

  $.ajax({
    method: "PUT",
    url: `/api/birds/${birdId}`,
    data: newBirdData,
    success: handleBirdUpdate,
  });
}

function handleBirdUpdate(updatedBird) {
  let birdId = updatedBird._id;

  //remove old bird item
  $("[data-bird-id=" + birdId +"]").remove();
  renderBird(updatedBird);

  $("[data-bird-id=" + birdId + "]")[0].scrollIntoView();

}

function handleDeleteBird(e) {
  e.preventDefault();

  let $bird = $(this).closest(".bird");
  let birdId = $bird.data("bird-id");
  console.log(`handleDeleteBird(): deleting birdId ${birdId}`);

  $.ajax({
    method: "DELETE",
    url: `/api/birds/${birdId}`,
    success: function(deletedBird) {
      $bird.remove();
    },
  });
}


}); //$(document).ready(function(){

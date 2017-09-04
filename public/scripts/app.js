console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// your code
$.ajax({
  method: "GET",
  url:"/api/profile"
})

$.ajax({
  method: "GET",
  url: "/api/heroes",
  success: displayHero
})
});
function displayHero(heroes){
  heroes.forEach(function(hero){
    renderHero(hero);
  });
}
  function renderHero(hero){
let heroesHTML = (`
  <div class="row album" data-album-id="${hero._id}">
      <div class="not-edit">
      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">


          <!-- begin album internal row -->
            <div class='row'>
              <div class="col-md-3 col-xs-12 thumbnail album-art">

              </div>

              <div class="col-md-9 col-xs-12">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class='inline-header'>Hero Name:</h4>
                    <span class='hero-name'>${hero.name}</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Powers:</h4>
                    <span class='hero-age'>${hero.powers}</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Hero Age:</h4>
                    <span class='hero-age'>${hero.age}</span>
                  </li>

                  <li class="list-group-item">
                    <h4 class='inline-header'>Secret Identity:</h4>
                    <span class='hero-secret_identity'>${hero.secret_identity}</span>
                  </li>
                </ul>
              </div>

            </div>
            <!-- end of album internal row -->

            <div class='panel-footer'>
              <div class='panel-footer'>
                <button class='btn btn-danger delete-album'>Delete Hero</button>
                <button class='btn btn-info edit-album'>Edit Hero</button>
                <button class='btn btn-info save-changes'>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  `)
  console.log("hello?");
  $("#hero-list").append(heroesHTML);
}
$("btn-primary").on("click", function(){
  
})

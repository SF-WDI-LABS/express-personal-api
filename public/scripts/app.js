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

function displayHero(heroes){
  heroes.forEach(function(hero){
    renderHero(hero);
  });
}

  $("form").on("submit", function(e){
    e.preventDefault();
      let userHero = $(this).serialize();
      console.log(userHero);
      $.post("/api/heroes", userHero, function(data){
        renderHero(data);
      });
      $(this).trigger("reset");
});
});

  function renderHero(hero){
let heroesHTML = (`
  <div class="row album" data-album-id="${hero._id}">
      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">


          <!-- begin album internal row -->
            <div class='row'>
              </div>

              <div class="col-md-9 col-xs-12">
                <ul class="list-group">
                  <li>
                    <h4>Hero Name:</h4>
                    <span>${hero.name}</span>
                  </li>

                  <li>
                    <h4>Powers:</h4>
                    <span>${hero.powers}</span>
                  </li>

                  <li>
                    <h4>Hero Age:</h4>
                    <span>${hero.age}</span>
                  </li>

                  <li>
                    <h4>Secret Identity:</h4>
                    <span>${hero.secret_identity}</span>
                  </li>
                </ul>
              </div>

            </div>
            <!-- end of album internal row -->

            <div class='panel-footer'>
              <div class='panel-footer'>
                <button class='btn btn-danger delete-album'>Delete Hero</button>
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

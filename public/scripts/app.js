console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// Profile GET Statement
$.ajax({
  method: "GET",
  url:"/api/profile"
})
// DB GET Statement
$.ajax({
  method: "GET",
  url: "/api/heroes",
  success: displayHero
})


// Function to show seeded DB
function displayHero(heroes){
  heroes.forEach(function(hero){
    renderHero(hero);
  });
}
// Post function
  $("form").on("submit", function(e){
    e.preventDefault();
      let userHero = $(this).serialize();
      console.log(userHero);
      $.post("/api/heroes", userHero, function(data){
        renderHero(data);
      });
      $(this).trigger("reset");
});
// Delete button actions on click event
$("#hero-list").on("click", ".btn-danger", removeHero());
// DELETE Ajax Call
$.ajax({
  url: "/api/heroes/:Id" + removeHero(),
  method: "DELETE",
  success: removeHero
});
// Delete Function
function removeHero(data){
  let deletedHero = $(this).parents(".data-hero-id").data(".hero.-id")
  $(".data-hero-id" + deletedHero).remove();
}

});
// Page Render of DB
  function renderHero(hero){
let heroesHTML = (`
  <div class="data-hero-id="${hero._id}">
      <div class="col-md-10 col-md-offset-1">
          <br>
            <div class="row">
              </div>

              <div class="col-md-9 col-xs-12">
                <ul class="list-heroes">
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

            <div class="panel-footer">
              <div class="panel-footer">
                <button type="submit" class="btn btn-danger delete-hero">Delete Hero</button>
              </div>
            </div>
            </div>
        </div>
      </div>
  `)
  console.log("hello?");
  $("#hero-list").append(heroesHTML);
}

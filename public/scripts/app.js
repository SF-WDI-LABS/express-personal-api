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

$("#hero-list").on("click", ".btn.btn-danger", removeHero())

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

$.ajax({
  url: "/api/heroes/:id",
  method: "DELETE",
  success: removeHero
});

function removeHero(data){
  let deletedHero = $(this).parents(".data-hero-id").data("hero._id")
  $(".data-hero-id" + deletedHero).remove();
}

});

  function renderHero(hero){
let heroesHTML = (`
  <div class="data-hero-id="${hero._id}">
      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default">
          <div class="panel-body">
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
      </div>
  `)
  console.log("hello?");
  $("#hero-list").append(heroesHTML);
}

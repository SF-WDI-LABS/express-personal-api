console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  console.log('app.js loaded!');

  $.ajax({
    method: 'GET',
    url: '/api/boardgames',
    success: renderMultipleGames
  });

$('.new-game').on('click', function() {
  $('.hidden-form').toggle();
})





// end of document ready
});




function renderMultipleGames(games) {
  console.log("Reached renderMultipleGames");
  games.forEach(function (game) {
    renderOneGame(game);
  });
};


function renderOneGame (game) {
  let newHTML = `

  <div class="card" style="width: 45rem;">
    <img class="card-img-top text-center" src="${game.image}" alt="Card image cap">
    <div class="card-body">
      <h4 class="card-title">${game.title}</h4>
      <p class="card-text">${game.description}</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Game Length: ${game.playtime}</li>
      <li class="list-group-item">Players: ${game.players}</li>
    </ul>

  </div>
  `
  $('.display-games').prepend(newHTML);
}

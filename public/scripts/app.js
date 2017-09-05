console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  console.log('app.js loaded!');

  $.ajax({
    method: 'GET',
    url: '/api/boardgames',
    success: renderMultipleGames
  });

// Displays new game form on click
$('.new-game').on('click', function() {
  $('.hidden-form').toggle();
  $('.new-game').toggle();
})

// Allows user to go back to main view from new game form
$('#cancel-btn').on('click', function(event) {
  event.preventDefault();
  $('.hidden-form').toggle();
  $('.new-game').toggle();
})

// Creates new game on submit
$('.new-game-form').on('submit', function(event) {
  event.preventDefault();
  let formData = $(this).serialize();

  // console.log(formData);
  $.ajax({
    type: "POST",
    url: '/api/newBoardgame',
    data: formData,
  })
  .then(function(createdGame){
    renderOneGame(createdGame);
    console.log("rendered new game");
    $('.new-game-form')[0].reset();
    $('.hidden-form').toggle();
    $('.new-game').toggle();

  })
  .catch(function (err) {
    console.log(err);
  })
})


$('.display-games').on('click', '.edit-game', handleEditGame);

$('.display-games').on('click', '.save-edits', handleUpdateGame);

$('.display-games').on('click', '.delete-game', handleDeleteGame);




// end of document ready
});




function renderMultipleGames(games) {
  console.log("Reached renderMultipleGames");
  games.forEach(function (game) {
    renderOneGame(game);
  });
};


function renderOneGame (game) {
  console.log(game);
  let newHTML = `

  <div class="card game" data-game-id="${game._id}" style="width: 45rem;">
    <img class="card-img-top text-center" src="${game.image}" alt="Card image cap">
    <div class="card-body">
      <h4 class="card-title"><span class="game-title">${game.title}</span></h4>
      <p class="card-text"><span class="game-description">${game.description}</span></div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Game Length: <span class="game-playtime">${game.playtime}</span></li>
      <li class="list-group-item">Players: <span class="game-players">${game.players}</span></li>
    </ul>
    <button class="btn btn-info edit-game switch">Edit</button>
    <button class="btn btn-success save-edits switch">Save Changes</button>
    <button class="btn btn-danger delete-game">Delete</button>
  </div>
  `
  $('.display-games').prepend(newHTML);

}

function handleEditGame(event) {
  let $thisGame = $(this).closest('.game');
  let gameId = $thisGame.data('game-id');

  $thisGame.children('.switch').toggle();

  $title = $thisGame.find('span.game-title');
  $title.html('<input class="updated-title" value="' + $title.text() + '"></input>');

  $description = $thisGame.find('span.game-description');
  $description.html(`<textarea class="updated-description" cols="50" rows="5" name="updated-description">${$description.text()}</textarea>`);

  $playtime = $thisGame.find('span.game-playtime');
  $playtime.html('<input class="updated-playtime" value="' + $playtime.text() + '"></input>');

  $players = $thisGame.find('span.game-players');
  $players.html('<input class="updated-players" value="' + $players.text() + '"></input>');

}


function handleUpdateGame(event) {
  let $thisGame = $(this).closest('.game');
  let gameId = $thisGame.data('game-id');
  console.log($thisGame.find('.updated-title').val());

  let updatedGameData = {
    title: $thisGame.find('.updated-title').val(),
    description: $thisGame.find('.updated-description').val(),
    playtime: $thisGame.find('.updated-playtime').val(),
    players: $thisGame.find('.updated-players').val(),
  }

  let putURL = '/api/boardgames/' + gameId
  console.log(putURL);

  $.ajax({
    type: "PUT",
    url: putURL,
    data: updatedGameData,

  })
  .then(function(updatedGame) {
    // Reached here
    // console.log(updatedGame);
    $('[data-game-id =' + gameId + ']').remove();

    renderOneGame(updatedGame);

    $('[data-game-id =' + gameId + ']')[0].scrollIntoView();

  })
  .catch(function(err) {
    console.log('Ajax put error', err);
  })
}


function handleDeleteGame(event) {
  let $thisGame = $(this).closest('.game');
  let gameId = $thisGame.data('game-id');
  console.log(gameId);

  $.ajax({
    type: "DELETE",
    url: '/api/boardgames/' + gameId,
  })
  .then(function (deletedGame) {
    console.log('successful delete', deletedGame);
    $('[data-game-id =' + gameId + ']').remove();
  })
  .catch(function (err) {
    console.log('Ajax delete error', err);
  })
}

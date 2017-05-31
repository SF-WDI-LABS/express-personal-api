// sanity check

let debug = "asdf";


console.log("You're sane.");

$(document).ready(function() {

  let apiUrl = '/api/mushrooms'; //Base URL
  let allMushrooms = [];


  // Getting all the mushrooms
  $.ajax({
    method: "GET",
    url: apiUrl,
    success: function addMushrooms(data) {
      console.log('GET response:', data);
      allMushrooms = data;
      populate(allMushrooms);
    }
  })

  $('mushroom_input').on('submit', function(event) { // listen for form submission
      event.preventDefault();
    let newShroom = $(this).serialize();
    // Adding a single mushroom
    $.ajax({
      method: "POST",
      url: apiUrl,
      data: newShroom,
      success: function onCreateSuccess(response) {
        console.log(response);
        console.log(newShroom);
        console.log(allMushrooms);
        allMushrooms.push(response);
      }
    });
  });

  function populate(entries) {
    for (let i = 0; i < allMushrooms.length; i++) {

      // Pulls Values from each object in the array
      let eyeD = entries[i]._id;
      let common = entries[i].commonName;
      let sci = entries[i].taxonomy;
      let dateF = entries[i].dateFound;
      let loc = entries[i].locationFound;
      let eat = entries[i].edibility;
      let cert = entries[i].certainty;
      let photosrc = entries[i].photo;

      // Returns a filled-in template for each object.
      function template() {
        return `<div data-id="${eyeD}" class="entry">
        <div class="col-sm-12 col-md-6 nopadding image-container">
          <img class="mushroom-pic" src="${photosrc}" />
          <div class="edibility-label">
            <div class="certainty">
              <div class="percentage">
                ${cert}%
              </div>
              <div class="certain">
                Certainty
              </div>
            </div>
            <div class="edible-poisonous">
              ${eat}
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6">
          <h3>${common}</h3>
          <h4>${sci}</h4>
          <p>
            Found at ${loc} on ${dateF}.
          </p>
          <input class="delete-entry" type="button" value="Delete this Mushroom" />
        </div>
      </div>`;
      }

      // Makes a jQuery insertion for every object in the array.
      $('#gallery').append(template());
    }

    $('.delete-entry').on('click', function(event) {
      let delEyeD = $('.delete-entry').closest('.entry').attr('data-id');
      let mushDelete = allMushrooms.filter(function(mushroom) {
        return mushroom._id == delEyeD;
      })[0];

      $.ajax({
        type: 'DELETE',
        url: apiUrl + '/' + delEyeD,
        success: function onDeleteSuccess(data) {
          allMushrooms.splice(allMushrooms.indexOf(mushDelete), 1);
          populate(allMushrooms);
        }
      });
    });
  };


});

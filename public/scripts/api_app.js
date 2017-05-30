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

    // Object Values
    let common = entries[i].commonName;
    let tax = entries[i].taxonomy;
    let dateF = entries[i].dateFound;
    let loc = entries[i].locationFound;
    let eat = entries[i].edibility;
    let cert = entries[i].certainty;
    let photosrc = entries[i].photo;

    function template(){
      return `<div class="entry">
        <div class="col-sm-12 col-md-6 nopadding image-container">
          <img class="mushroom-pic" src="${photosrc}" />
          <div class="edibility-label">
            <div class="certainty">
              <div class="percentage">
                ${cert}
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
          <h4>${tax}</h4>
          <p>
            Found at ${loc} on ${dateF}.
          </p>
        </div>
      </div>`;
    }
    $('#gallery').append(template());
    }
  };
});
// let $imgCont = '<div class="col-sm-12 col-md-6 nopadding image-container"></div>'; // Image-container div
// let $photo = `<img class="mushroom-pic" src="${$photosrc}">`; // Image
// console.log(i + " times");
// // The below variable/value pairing is ugly. It's a bunch of nested divs that
// // take a few variables, and I don't yet know of an easier way to put it all together.
// let $edibLabel = `<div class="edibility-label"><div class="certainty"><div class="percentage">${$cert}%</div><div class="certain">Certainty</div></div><div class="edible-poisonous">${$eat}</div>/div>`;
// let $descrip = '<div class="col-sm-12 col-md-6"></div>';
// let $text = `<p>Found at ${$loc} on ${$date}.</p>`;

// Putting it all together

//   $('<div/>').attr("id", "newEntry" + i) // Create a div w/ unique ID
//   .append(($imgCont).append($photo, $edibLabel), // Add continer div, image, and label divs
//     ($descrip.append($common, $tax, $text)) // Add h3, h4, and paragraph of
//   )
// )

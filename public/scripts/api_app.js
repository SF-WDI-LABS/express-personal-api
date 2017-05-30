// sanity check
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
      allMushrooms = data.mushrooms;
    }
  })

  $('#mushroom_input').on('submit', function (event) { // listen for form submission
    event.preventDefault();
    let newShroom = $(this).serialize();


// Adding a single mushroom
  $.ajax({
    method: "POST",
    url: apiUrl,
    data: newShroom,
    success: function onCreateSuccess(response) {
      console.log(response);
      allMushrooms.push(response);
    }
  });


function addMushrooms(entries){
  for (let i = 0; i < entries.length; i++) {

    // Object Values
    let $common =      $("<h3/>").text(entries[i].commonName); // Create a h3, and insert text into it
    let $tax =         $("<h4/>").text(entries[i].taxonomy); // Create a h4, and insert text into it
    let $date =        entries[i].dateFound;
    let $loc =         entries[i].locationFound;
    let $eat =         entries[i].edibility;
    let $cert =        entries[i].certainty;
    let $photosrc =    entries[i].photo);

    // HTML Variables
    let $imgCont =    '<div class="col-sm-12 col-md-6 nopadding image-container"></div>'; // Image-container div
    let $photo =      `<img class="mushroom-pic" src="${$photosrc}"`>; // Image

    // The below variable/value pairing is ugly. It's a bunch of nested divs that
    // take a few variables, and I don't yet know of an easier way to put it all together.
    let $edibLabel =  `<div class="edibility-label"><div class="certainty"><div class="percentage">${$cert}%</div><div class="certain">Certainty</div></div><div class="edible-poisonous">${$eat}</div>/div>`;
    let $descrip =    '<div class="col-sm-12 col-md-6"></div>';
    let $text =       `<p>Found at ${$loc} on ${$date}.</p>`;


    // Putting it all together
    $(gallery).append(
                      $('<div/>').attr("id", "newEntry" + i)            // Create a div w/ unique ID
                        .append(($imgCont).append($photo, $edibLabel),  // Add continer div, image, and label divs
                                ($descrip.append($common, $tax, $text)) // Add h3, h4, and paragraph of
                               )
                      )
  }
};

addMushrooms(allMushrooms);

});

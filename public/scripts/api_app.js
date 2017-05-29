// sanity check
console.log("You're sane.");


$( document ).ready(function() {

function addMushrooms(entries){
  for (let i = 0; i < entries.length; i++) {

    // Set Variables
    let common = $("<h3/>").text(entries[i].CommonName);
    let tax = $("<h4/>").text(entries[i].Taxonomy);
    let date = $("<span class="location"></>").text(entries[i].Date);
    let loc =  $("<span class="date"></>").text(entries[i].Location);
    let eat = $("<div class="edible-poisonous"></>").text(entries[i].Edibility);
    let cert = $("<div class="certain"></>").text(entries[i].Certainty);
    let photosrc = entries[i].Photo);

    $(gallery).append(
      $('<div/>').attr("id", "newEntry" + i)                  // Add id to new <div>
        .append(h2text,                                       // Add <h2> with text
                ptext.prepend($('<img/>').attr("src", imgsrc) // Add <img>-and-text-containing <p>
                ),
                atext.attr("href", linkhref)                  // Add <a> with text and link
      )
    )
  }
};

addEntries(contThought, '#thought-content');
addEntries(contDesign, '#design-content');
addEntries(contDev, '#dev-content');

});

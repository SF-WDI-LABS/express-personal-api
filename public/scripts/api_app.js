// sanity check
console.log("You're sane.");


$( document ).ready(function() {
  $.ajax({
    method: "GET",
    url: "/api/mushrooms",
    success: function(mushrooms){
      console.log("success")

      mushrooms.forEach(function(mushroom){
        $(".unicorn-list").append(`<div class="unicorn" id="unicorn-${unicorn._id}">
            <li>${unicorn.name} has ${unicorn.number_of_horns} horns</li>
          </div>
        `);
      })

    },
    error: function(){
      alert("Wow. Bad thing.")
    }
  })


function addMushrooms(entries){
  for (let i = 0; i < entries.length; i++) {

    // Object Values
    let $common =      $("<h3/>").text(entries[i].CommonName);
    let $tax =         $("<h4/>").text(entries[i].Taxonomy);
    let $date =        entries[i].Date;
    let $loc =         entries[i].Location;
    let $eat =         entries[i].Edibility;
    let $cert =        entries[i].Certainty;
    let $photosrc =    entries[i].Photo);

    // HTML Variables
    let $imgCont =    '<div class="col-sm-12 col-md-6 nopadding image-container"></div>';
    let $photo =      `<img class="mushroom-pic" src="${$photosrc}"`>;
    let $edibLabel =  `<div class="edibility-label"><div class="certainty"><div class="percentage">${$cert}%</div><div class="certain">Certainty</div></div><div class="edible-poisonous">${$eat}</div>/div>`;
    let $descrip =    '<div class="col-sm-12 col-md-6"></div>';
    let $text =       `<p>Found at ${$loc} on ${$date}.</p>`;


    // Putting it all together
    $(gallery).append(
      $('<div/>').attr("id", "newEntry" + i)                  // Add id to new <div>
        .append(($imgCont).append($photo, $edibLabel),
                ($descrip.append($common, $tax, $text)))// Add image container
  }
};

addMushrooms();

});

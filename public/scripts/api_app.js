// sanity check
console.log("You're sane.");


$( document ).ready(function() {

// function addEntries(contentType, section){
//   for (let i = 0; i < contentType.length; i++) {
//
//     // Set Variables
//     let h2text = $("<h2/>").text(contentType[i].title);
//     let ptext = $("<p/>").text(contentType[i].description);
//     let imgsrc = contentType[i].pic;
//     let linkhref = contentType[i].link;
//     let atext = $("<a></a>").text("Check it out!"); // Filler text (Will turn into clickbait later)
//
//     $(section).append(
//       $('<div/>').attr("id", "newEntry" + i)                  // Add id to new <div>
//         .append(h2text,                                       // Add <h2> with text
//                 ptext.prepend($('<img/>').attr("src", imgsrc) // Add <img>-and-text-containing <p>
//                 ),
//                 atext.attr("href", linkhref)                  // Add <a> with text and link
//       )
//     )
//   }
// };
//
// addEntries(contThought, '#thought-content');
// addEntries(contDesign, '#design-content');
// addEntries(contDev, '#dev-content');

});

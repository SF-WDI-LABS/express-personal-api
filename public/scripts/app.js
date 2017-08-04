// sanity check
console.log("You're sane.");


$( document ).ready(function() {


  // Content-mill arrays for testing
  let contDesign = [
    {
      title: "Some Title for this Design Content. - 1",
      description: "First long bit of design content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/design_1.png",
      link: "https://www.example.com/design_1"
    },
    {
      title: "Some Title for this Design Content. - 2",
      description: "Second long bit of design content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/design_2.png",
      link: "https://www.example.com/design_2"
    },
    {
      title: "Some Title for this Design Content. - 3",
      description: "Third long bit of design content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/design_3.png",
      link: "https://www.example.com/design_3"
    },
    {
      title: "Some Title for this Design Content. - 4",
      description: "Fourth long bit of design content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/design_4.png",
      link: "https://www.example.com/design_4"
    },
    {
      title: "Some Title for this Design Content. - 5",
      description: "Fifth long bit of design content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/design_5.png",
      link: "https://www.example.com/design_5"
    },
    {
      title: "Some Title for this Design Content. - 6",
      description: "Sixth long bit of design content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/design_6.png",
      link: "https://www.example.com/design_6"
    },
    {
      title: "Some Title for this Design Content. - 7",
      description: "Seventh long bit of design content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/design_7.png",
      link: "https://www.example.com/design_7"
    }
  ];

  let contThought = [
    {
      title: "Some Title for this Thought Content. - 1",
      description: "First long bit of thought content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/thought_1.png",
      link: "https://www.example.com/thought_1"
    },
    {
      title: "Some Title for this Thought Content. - 2",
      description: "Second long bit of thought content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/thought_2.png",
      link: "https://www.example.com/thought_2"
    },
    {
      title: "Some Title for this Thought Content. - 3",
      description: "Third long bit of thought content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/thought_3.png",
      link: "https://www.example.com/thought_3"
    },
    {
      title: "Some Title for this Thought Content. - 4",
      description: "Fourth long bit of thought content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/thought_4.png",
      link: "https://www.example.com/thought_4"
    },
    {
      title: "Some Title for this Thought Content. - 5",
      description: "Fifth long bit of thought content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/thought_5.png",
      link: "https://www.example.com/thought_5"
    },
    {
      title: "Some Title for this Thought Content. - 6",
      description: "Sixth long bit of thought content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/thought_6.png",
      link: "https://www.example.com/thought_6"
    }
  ];

  let contDev = [
    {
      title: "Some Title for this Dev Content. - 1",
      description: "First long bit of development content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/dev_1.png",
      link: "https://www.example.com/dev_1"
    },
    {
      title: "Some Title for this Dev Content. - 2",
      description: "Second long bit of development content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/dev_2.png",
      link: "https://www.example.com/dev_2"
    },
    {
      title: "Some Title for this Dev Content. - 3",
      description: "Third long bit of development content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/dev_3.png",
      link: "https://www.example.com/dev_3"
    },
    {
      title: "Some Title for this Dev Content. - 4",
      description: "Fourth long bit of development content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/dev_4.png",
      link: "https://www.example.com/dev_4"
    },
    {
      title: "Some Title for this Dev Content. - 5",
      description: "Fifth long bit of development content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/dev_5.png",
      link: "https://www.example.com/dev_5"
    },
    {
      title: "Some Title for this Dev Content. - 6",
      description: "Sixth long bit of development content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/dev_6.png",
      link: "https://www.example.com/dev_6"
    },
    {
      title: "Some Title for this Dev Content. - 7",
      description: "Seventh long bit of development content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/dev_7.png",
      link: "https://www.example.com/dev_7"
    },
    {
      title: "Some Title for this Dev Content. - 8",
      description: "Eighth long bit of development content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/dev_8.png",
      link: "https://www.example.com/dev_8"
    },
    {
      title: "Some Title for this Dev Content. - 9",
      description: "Ninth long bit of development content where I drone on and on about this project and something something until you lose interest and click back to a listicle of some sort.",
      pic: "/images/dev_9.png",
      link: "https://www.example.com/dev_9"
    },
  ];

function addEntries(contentType, section){
  for (let i = 0; i < contentType.length; i++) {

    // Set Variables
    let h2text = $("<h2/>").text(contentType[i].title);
    let ptext = $("<p/>").text(contentType[i].description);
    let imgsrc = contentType[i].pic;
    let linkhref = contentType[i].link;
    let atext = $("<a></a>").text("Check it out!"); // Filler text (Will turn into clickbait later)

    $(section).append(
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

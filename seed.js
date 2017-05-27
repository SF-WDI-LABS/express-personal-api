// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

 var db = require('./models'); // This is the index.js file.

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

let movie_listings = [
    {
        title: 'Logan',
        genre: ['Action &amp; Adventure', 'Drama', 'Science &amp; Fiction', 'Fantasy'],
        tomatoMeter: 92,
        haveIseenIt: false, 
        image: 'https://resizing.flixster.com/0E6Et1Fi6wFzN9PFWdZdyIl2H_c=/206x305/v1.bTsxMjMwNDQ4NDtqOzE3MzMyOzEyMDA7NjI2OzkyNA'
    },
    {
        title: 'Norman',
        genre: ['Drama'],
        tomatoMeter: 87,
        haveIseenIt: false, 
        image: 'https://resizing.flixster.com/M-EHPEAHIOeIpBniHySCXPPlIac=/206x305/v1.bTsxMjM1MDczMDtqOzE3MzMyOzEyMDA7ODEyNzsxMjA0MA'
    },
    {
        title: 'The Lego Batman Movie',
        genre: ['Action & Adventure', 'Animation', 'Comedy', 'Kids &amp; Family'],
        tomatoMeter: 90,
        haveIseenIt: false,
        image: 'https://resizing.flixster.com/5e1sqBSS4Yjl16MU2CK4QtFrTA8=/206x305/v1.bTsxMjI3NjU0NTtqOzE3MzMyOzEyMDA7NDA1MDs2MDAw'
    },
    {
        title: 'My Life as a Zucchini',
        genre: ['Animation', 'Art House &amp; International', 'Kids &amp; Family'],
        tomatoMeter: 100,
        haveIseenIt: false,
        image: 'https://resizing.flixster.com/8Y1vg4k4vnncA05-gKZRrb3E3-o=/206x305/v1.bTsxMjMxMDIwNDtqOzE3MzMyOzEyMDA7MzY4OzUzOA'
    },
    {
        title: 'Berlin Syndrome',
        genre: ['Art House &amp; International', 'Drama', 'Mystery &amp; Suspense'],
        tomatoMeter: 76,
        haveIseenIt: false,
        image: 'https://resizing.flixster.com/wx-IBk9diQ5EMelmhnDSaPNDB-4=/206x305/v1.bTsxMjQwMTA0NTtqOzE3MzMzOzEyMDA7NjM5Ozk0Ng'
    }
]

// Remove everything first.
db.Movie.remove({}, function() {
    console.log('removed all movies! yay!');
    // 
    db.Movie.create(movie_listings, function(err, moviesArray){
        if (err) {
          console.log(err);
          return;
        }
        console.log('Created all movies!');
        console.log("Created", moviesArray.length, "movies!");
    })
    
})

//db.Author.remove({}, function(err, authors) {
//  console.log('removed all authors');
//  db.Author.create(authors_list, function(err, authors){
//    if (err) {
//      console.log(err);
//      return;
//    }
//    console.log('recreated all authors');
//    console.log("created", authors.length, "authors");
//
//
//    db.Book.remove({}, function(err, books){
//      console.log('removed all books');
//      books_list.forEach(function (bookData) {
//        var book = new db.Book({
//          title: bookData.title,
//          image: bookData.image,
//          releaseDate: bookData.releaseDate
//        });
//        db.Author.findOne({name: bookData.author}, function (err, foundAuthor) {
//          console.log('found author ' + foundAuthor.name + ' for book ' + book.title);
//          if (err) {
//            console.log(err);
//            return;
//          }
//          book.author = foundAuthor;
//          book.save(function(err, savedBook){
//            if (err) {
//              return console.log(err);
//            }
//            console.log('saved ' + savedBook.title + ' by ' + foundAuthor.name);
//          });
//        });
//      });
//    });
//
//  });
//});

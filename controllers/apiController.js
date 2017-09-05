function index(req, res) {
  res.json({
    message: "Welcome to dogShopz!",
    documentation_url: "https://agile-wildwood-44374.herokuapp.com/",
    base_url: "localhost:3000",
    endpoints: [
      {
        method: "GET", path: "/api", description: "Describes available endpoints"
      }
    ]
  });
}




 module.exports = {
  index: index
}


//  app.get('/api', function apiIndex(req, res) {
//   // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
//   // It would be seriously overkill to save any of this to your database.
//   // But you should change almost every line of this response.
//   res.json({
//     // woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
//     message: "Welcome to my personal api! Here's what you need to know!",
//     documentationUrl: "https://github.com/example-username/express-personal-api/README.md", // CHANGE ME
//     baseUrl: "localhost:3000", 
//     endpoints: [
//       {method: "GET", path: "/api", description: "Describes all available endpoints"},
//       // {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
//       // {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
//     ]
//   })
// });




function index(req, res) {
  res.json({

    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/supertrunkes/express-personal-api",
    baseUrl: "https://sheltered-beyond-13845.herokuapp.com",
    endpoints: [
      {
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints"
      },
      {
        method: "GET",
        path: "/api/profile",
        description: "Get to know me."
      },
      {
        method: "GET"
        path: "/api/movies"
        description: "Get a list of movies"
      },
      {
        method: "POST",
        path: "/api/movies",
        description: "Add a movie to the data base"
      }, 
    ],
  })
}

module.exports={
  index: index,
}

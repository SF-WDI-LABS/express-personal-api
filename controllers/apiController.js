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
        path: "/profile",
        description: "Get to know me."
      },
      {
        method: "GET",
        path: "/director",
        description: "Get a list of directors."
      },
      {
        method: "GET",
        path: "/director/:id",
        description: "Find a single director by their ID number",
      },
      {
        method: "POST",
        path: "/director",
        description: "Add a director to the list.",
      },
      {
        method: "PUT",
        path: "/director/:id",
        description: "Update a director's information.",
      },
      {
        method: "DELETE",
        path: "/director/:id",
        description: "Remove a director from the list.",
      },
    ],
  })
}

module.exports={
  index: index,

}

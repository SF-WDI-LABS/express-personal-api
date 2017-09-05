function index(req, res) {
  res.json({
    message: "Welcome to my personal API!",
    documentation_url: "https://github.com/jcheng305/express-personal-api",
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

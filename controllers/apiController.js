function index(req, res) {
  res.json({
    message: 'Welcome to Cliffly!',
    documentation_url: 'https://github.com/MaluPalu/express-personal-api/blob/master/DOCUMENTATION.md',
    base_url: 'https://evening-beach-72520.herokuapp.com/',
    endpoints: [
        {method: "GET", path: "/api", description: "Describes all available endpoints"},
        {method: "GET", path: "/api/profile", description: "Describes all available endpoints"},
        {method: "GET", path: "/api/cliffs", description: "List Cliff jumping specifiations"},
        {method: "POST", path: "/api/cliffs", description: "Add Cliff jumping specifiations"},
        {method: "PUT", path: "/api/cliffs/:id", description: "Update Cliff jumping specifiations"},
        {method: "DELETE", path: "/api/cliffs/:id", description: "Delete Cliff jumping specifiations"},
        {method: "GET", path: "/api/cliffs/:id", description: "Individual Cliff jumping specifiations"}
    ]
  });
}

module.exports = {
  index: index
}

function profile(req, res) {
  res.json({
    message: "Info about Bryan Albini!",
    documentation_url: "",
    base_url: "localhost:3000/api",
    endpoints: [
      {
        method: "GET", path: "/profile", description: "Info about Bryan"
      }
    ],
    data: {
      name: "Bryan",
      githubUsername: "balbini",
      githubLink: "https://github.com/balbini",
      personalSiteLink: "https://balbini.github.io/",
      currentCity: "San Francisco, CA",
      hobbies:"Video Games, Dungeons & Dragons"
    }
  });
}

 module.exports = {
   index: profile
 }

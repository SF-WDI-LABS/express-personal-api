var db = require('./models');

var projectsList = [
{
 name: 'Race the cars',
 githubRepoUrl: 'https://github.com/jojobeth1/Game_Project0',
 deployedUrl: 'https://jojobeth1.github.io/Game_Project0/',
 screenshot: ''
},
{
 name: 'Start Portfolio',
 githubRepoUrl: 'https://github.com/jojobeth1/jojobeth1.github.io',
 deployedUrl: 'https://jojobeth1.github.io/',
 screenshot: ''
}
];
// removes all projects before re-seeding
db.Projects.remove({}, function(err, project){
  // code below runs after all projects are removed
  db.Projects.create(projectsList, function(err, project){
    if(err){
      return
      console.log('ERROR', err);
    }
    console.log("All of my projects: ", project);
    console.log("created", project.length, "projects")
  })
})

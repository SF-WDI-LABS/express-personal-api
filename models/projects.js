 var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

 var ProjectsSchema = new Schema({
  name: String,
  githubRepoUrl: String,
  deployedUrl: String,
  screenshot: String
 });

 var Projects = mongoose.model('Projects', ProjectsSchema);

 module.exports = Projects;

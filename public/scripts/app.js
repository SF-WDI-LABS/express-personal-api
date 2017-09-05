console.log("Sanity Check: JS is working!");

$(document).ready(function(){

// your code
$.ajax({
    method: 'GET',
    url: '/api/projects',
    success: renderMultipleProjects
  });
$('#project-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/projects', formData, function(project) {
      console.log('project after POST', project);
      renderProject(project);  //render the server's response
    });
    $(this).trigger("reset");
  });
});

function renderMultipleProjects(projects) {
  projects.forEach(function(project) {
    renderProject(project);
  });
}

function renderProject(project){
	$('#projects').append(`<div class="card" style="width: 20rem;">
  <img class="card-img-top" src="${project.screenshot}">
  <div class="card-body">
    <h4 class="card-title">${project.name}</h4>
    <p class="card-text">${project.description}</p>
    <a href="${project.deployedUrl}" class="btn btn-primary">Site</a>
    <a href="${project.githubRepoUrl}" class="btn btn-default">Github</a>
  </div>
</div>`)
}
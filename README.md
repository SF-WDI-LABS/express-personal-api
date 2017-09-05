# <img src="https://cloud.githubusercontent.com/assets/7833470/10423298/ea833a68-7079-11e5-84f8-0a925ab96893.png" width="60"> Personal API

Hello,

My name is Huan Ming Liao. This is a mini API I created for one of the General Assembly's projects. It incoporates REST-ful Routes (GET, POST, UPDATE, DELETE), one CRUD-able resource (Create, Read, Update, Destroy), and some basic detail about me at the endpoint /api/profile.

My based URL for the api website is https://frozen-lowlands-63435.herokuapp.com

The following are end points you can add on to the based URL for different purposes. Please read description for each. 

To view the following in JSON format, visit: 
https://frozen-lowlands-63435.herokuapp.com/api

To experience the following with a more appealing interface, check out here: https://https://frozen-lowlands-63435.herokuapp.com/story

data_endpoints: [
  {method: "GET", path: "/", description: "A HTML page that describes all available endpoints"},

  {method: "GET", path: "/api", description: "A JSON view page that describes all available endpoints"},

  {method: "GET", path: "/api/profile", description: "Data about me"}, 

  {method: "GET", path: "/api/images", description: "Images I took from my LA trip"},
],

CRUD_endppoints: [
  {method: "GET", path: "/story/index", description: "Retreat all records in story database and render them onto index.html, with additional GUI that user CRUD all records"},

  {method: "POST", path: "/story/create", description: "Create a entry in the story database after a JSON object is sent to the server", required_JSON_obj_format:{form_title : 'String', form_description: 'String', form_link: 'String'}},

  {method: "GET", path: "/story/show/:story_id", description: "Display a single record in the database matching the given id"},

  {method: "PUT", path: "/story/update/:story_id", description: "Update an existing database record with a matched story data-id in the url. Also need send JSON object to the server", required_JSON_obj_format:{name: "String", description: "String"}},

  {method: "DELETE", path: "/story/delete/:story_id", description: "Delete an existing database record matching the given story id in the url"},
]
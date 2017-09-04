// storySchema.js

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StorySchema = new Schema({
  name: String,
  link: String,
  description: String,
  comments: String,
});

var Story = mongoose.model('Story', StorySchema);

module.exports = Story;

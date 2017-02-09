var Conversation = require("../models/Conversation");

var Conversations = Backbone.Collection.extend({
  model: Conversation,
  url: 'http://shintech.ninja:8000/api/conversations'
});

module.exports = Conversations;
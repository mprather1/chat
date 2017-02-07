var Message = require("../models/Message");

var Messages = Backbone.Collection.extend({
  model: Message,
  url: 'http://shintech.ninja:8000/api/messages'
});

module.exports = Messages;
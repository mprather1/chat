var Message = require("../models/Message");

var Messages = Backbone.Collection.extend({
  model: Message
});

module.exports = Messages;
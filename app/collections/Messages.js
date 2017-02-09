var Message = require("../models/Message");

var Messages = Backbone.Collection.extend({
  model: Message,
  initialize: function(options){
    this._conversation = options._conversation;
    this.url = "http://shintech.ninja:8000/api/conversations/" + this._conversation.get('id') + "/messages"
  }
});

module.exports = Messages;
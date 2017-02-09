var Conversation = Backbone.Model.extend({
  urlRoot: 'http://shintech.ninja:8000/api/conversations'
});

module.exports = Conversation;
var ConversationView = Backbone.Marionette.View.extend({
  template: require("../templates/conversation-view-template.html"),
  tagName: 'li'
});

module.exports = ConversationView;
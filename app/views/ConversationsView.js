var ConversationView = require("./ConversationView");

var ConversationsView = Backbone.Marionette.CollectionView.extend({
  childView: ConversationView,
  tagName: 'ul',
  initialize: function(){
    this.collection.fetch({
      success: function(){
        console.log("Successfully fetched conversations...")
      }
    })
  }
});

module.exports = ConversationsView;
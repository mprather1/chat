var Messages = require("../collections/Messages");
var ChatWindowView = require("./ChatWindowView");

var SingleConversationView = Backbone.Marionette.View.extend({
  template: require("../templates/single-conversation-view-template.html"),

  initialize: function(){
    var conversation = this.model
    this.collection = new Messages({ _conversation: this.model })
    this.collection.on('sync', function(){
      window.singleConversationView.showChildView('chatWindow', new ChatWindowView({ _conversation: conversation, messages: this }))
    })
  },
  regions: {
    chatWindow: {
      el: '#chat-window'
    }
  },
  onRender: function(){
    this.collection.fetch({
      success: function(){
        console.log("Successfully fetched single message...")
      }
    })
  }
});

module.exports = SingleConversationView;
var Messages = require("../collections/Messages");
var ChatWindowView = require("./ChatWindowView");

var SingleConversationView = Backbone.Marionette.View.extend({
  template: require("../templates/single-conversation-view-template.html"),
  className: 'module',
  tagName: 'section',
  
  initialize: function(){
    var conversation = this.model
    this.collection = new Messages({ _conversation: this.model })
    this.collection.on('sync', function(){
      window.singleConversationView.showChildView('chatWindow', new ChatWindowView({ _conversation: conversation, messages: this }))
    })
  },
  regions: {
    chatWindow: {
      el: '#chat-window',
      replaceElement: true
    }
  },
  onRender: function(){
    this.collection.fetch({
      success: function(data){
        console.log("Successfully fetched messages...")
      }
    })
  }
});

module.exports = SingleConversationView;
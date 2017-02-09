var Marionette = require("marionette");
var LoginView = require("./views/LoginView");
var ChatWindowView = require("./views/ChatWindowView");
var UserFormView = require("./views/UserFormView");
var Conversation = require("./models/Conversation")
var Conversations = require("./collections/Conversations");
var ConversationsView = require("./views/ConversationsView");
var SingleConversationView = require("./views/SingleConversationView");

var Controller = Marionette.Object.extend({
  
  initialize: function(options){
    window.app = options.app;
  },
  login: function(){
    window.app.view.showChildView('main', new LoginView());
  },
  index: function(){
    var conversations = new Conversations();
    window.app.view.showChildView('main', new ConversationsView({ collection: conversations }));
  },
  userFormView: function(){
    window.app.view.showChildView('main', new UserFormView());
  },
  getSingleConversation: function(options){
    var conversation = new Conversation({ id: options })
    conversation.fetch({
      success: function(data){
        console.log("Successfully fetched /conversations/" + data.id)
      }
    }).then(function(){
      window.singleConversationView = new SingleConversationView({ model: conversation})
      window.app.view.showChildView('main', window.singleConversationView)
    })
  }
});

module.exports = Controller;
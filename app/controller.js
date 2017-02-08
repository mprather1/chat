var Marionette = require("marionette");
var LoginView = require("./views/LoginView");
var ChatWindowView = require("./views/ChatWindowView");
var UserFormView = require("./views/UserFormView");

var Controller = Marionette.Object.extend({
  
  initialize: function(options){
    
    this.app = options.app;
    this.chatWindowView = new ChatWindowView();
    
  },
  login: function(){
    this.app.view.showChildView('main', new LoginView());
  },
  index: function(){
    this.app.view.showChildView('main', this.chatWindowView);
  },
  userFormView: function(){
    this.app.view.showChildView('main', new UserFormView())
  }  
});

module.exports = Controller;
var Marionette = require("marionette");
var Controller = require("./controller");

var Router = Marionette.AppRouter.extend({
  
  initialize: function(options){
    this.controller = new Controller({ app: options.app });
  },
  appRoutes: {
    '': 'index',
    'login': 'login',
    'new/user': 'userFormView',
    'conversations/:id': 'getSingleConversation',
    'home': 'homepage'
  }
});

module.exports = Router;
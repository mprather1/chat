var LoginView = Backbone.Marionette.View.extend({
  tagName: 'div',
  className: 'panel panel-default form-view',
  template: require("../templates/login-view-template.html")
});

module.exports = LoginView;
var NavigationView = require("./NavigationView");
// var io = require("socket.io-client")
// var socket = io();
var RootView = Backbone.Marionette.View.extend({
  className: 'main',
  template: require("../templates/root-view-template.html"),
  regions: {
    header: {
      el: "#header-view"
    },
    main: {
      el: "#main-view"
    }
  },
  initialize: function(){
    this.render();
  },
});

module.exports = RootView;
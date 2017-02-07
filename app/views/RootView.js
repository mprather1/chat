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
  // events: {
  //   'click button': 'handleClick'
  // },
  initialize: function(){
    this.render();
 
  },
  onRender: function(){
    // this.showChildView('header', new NavigationView({ title: "Default" }));
  },
  // handleClick: function(e){
  //   e.preventDefault()
  //   socket.emit('chat message', $('#m').val());
  //   $('#m').val('');
  //   return false;
  // }
});

module.exports = RootView;
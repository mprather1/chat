var socket = io();
var Message = require("../models/Message");
var Messages = require("../collections/Messages");
var MessageView = require("./MessageView");
var MessagesView = require("./MessagesView")

var ChatWindowView = Backbone.Marionette.View.extend({
  template: require("../templates/chat-window-view-template.html"),
  initialize: function(){
    var messages = new Messages();
    socket.on('chat message', function(msg){
      var message = new Message({ message: msg })
      messages.add(message)
      // var audio = new Audio(__dirname + '/app/public/sounds/ding.wav');
      // audio.play();
    })
    this.messages = messages
    socket.on('user connected', function(msg) {
      $('.user-connected').html($('<li>').text(msg + " has joined the chat."))
    })
  },
  regions: {
    main: {
      el: '.discussion'
    }
  },
  events: {
    'click button': 'handleClick'
  },
  onRender: function(){
    this.showChildView('main', new MessagesView({ collection: this.messages }))
  },
  handleClick: function(e){
    e.preventDefault()
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  }  
});

module.exports = ChatWindowView;
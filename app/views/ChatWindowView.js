var socket = io();
var Message = require("../models/Message");
var Messages = require("../collections/Messages");
var MessageView = require("./MessageView");
var MessagesView = require("./MessagesView");
var Cookie = require("js-cookie");

var ChatWindowView = Backbone.Marionette.View.extend({
  template: require("../templates/chat-window-view-template.html"),
  initialize: function(){
    var messages = new Messages();
    var posted_cookie = Cookie.get('username');
    socket.on('chat message', function(msg){
      messages.add(msg);
      if(msg.posted_by === posted_cookie){
        $('.message-view:last').addClass('self');
      } else {
        $('.message-view:last').addClass('other');
      }
      // var audio = new Audio(__dirname + '/app/public/sounds/ding.wav');
      // audio.play();
    });
    this.messages = messages;
    this.posted_cookie = posted_cookie;
    // socket.on('user connected', function(msg) {
    //   $('.user-connected').html($('<li>').text(msg + " has joined the chat."))
    // })
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
    this.showChildView('main', new MessagesView({ collection: this.messages }));
  },
  handleClick: function(e){
    e.preventDefault();
    var message = new Message({ message: $('#m').val(), posted_by: this.posted_cookie });
    socket.emit('chat message', message);

    $('#m').val('');
    return false;
  }  
});

module.exports = ChatWindowView;
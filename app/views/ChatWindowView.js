var socket = io();
var Message = require("../models/Message");
var Messages = require("../collections/Messages");
var MessageView = require("./MessageView");
var MessagesView = require("./MessagesView");
var Cookie = require("js-cookie");

var ChatWindowView = Backbone.Marionette.View.extend({
  template: require("../templates/chat-window-view-template.html"),
  initialize: function(){
    var cookie = Cookie.get('username');
    var messages = new Messages();
    messages.fetch({
      success: function(){
        console.log("Successfully fetched messages...")
      }
    })
    socket.on('chat message', function(msg){
      messages.add(msg);
      window.scrollTo(0, document.body.scrollHeight);
    });
    this.messages = messages;
    this.cookie = cookie;
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
    var message = new Message({ content: $('#m').val(), author: this.cookie, time: new Date()});
    message.save()
    socket.emit('chat message', message);

    $('#m').val('');
    return false;
  }  
});

module.exports = ChatWindowView;
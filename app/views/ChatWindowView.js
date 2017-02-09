var socket = io();
var Message = require("../models/Message");
var Messages = require("../collections/Messages");
var MessagesView = require("./MessagesView");
var Cookie = require("js-cookie");
var User = require("../models/User");

var ChatWindowView = Backbone.Marionette.View.extend({
  template: require("../templates/chat-window-view-template.html"),
  initialize: function(options){
    var cookie = Cookie.get('userID');
    var author = new User({ id: cookie});
    this._conversation = options._conversation
    author.fetch({
      success: function(){
        console.log("Successfully fetched user...");
      }
    });
    var messages = options.messages
    socket.on('play', function(audio) {
      var sound = new Audio(audio.sound);
      sound.play();
    });
    socket.on('chat message', function(msg){
      messages.add(msg);
      window.scrollTo(0, document.body.scrollHeight);
    });
    this.messages = messages;
    this.author = author;
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
  onAttach: function(){
    window.scrollTo(0, document.body.scrollHeight);  
  },
  handleClick: function(e){
    e.preventDefault();
    var message = new Message({ content: $('#m').val(), author: this.author.get('id'), time: new Date(), avatar_img: this.author.get('avatar'), _conversation: this._conversation.get('id') });
    message.save();
    socket.emit('chat message', message);
    $('#m').val('');
    return false;
  }  
});

module.exports = ChatWindowView;
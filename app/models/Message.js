var Message = Backbone.Model.extend({
  // url: 'http://shintech.ninja:8000/api/messages',
  initialize: function(options){
    this.url = "http://shintech.ninja:8000/api/conversations/" + options._conversation + "/messages"
  }
});

module.exports = Message;
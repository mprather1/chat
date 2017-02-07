var Message = Backbone.Model.extend({
  url: 'http://shintech.ninja:8000/api/messages',
});

module.exports = Message;
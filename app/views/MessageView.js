var MessageView = Backbone.Marionette.View.extend({
  template: require("../templates/message-view-template.html"),
  tagName: 'li',
  className: 'message-view',
  onDomRefresh: function(){
    window.scrollTo(0, document.body.scrollHeight);
  }
});

module.exports = MessageView;

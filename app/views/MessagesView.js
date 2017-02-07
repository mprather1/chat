var MessageView = require("./MessageView");

var MessagesView = Backbone.Marionette.CollectionView.extend({
  childView: MessageView,
  tagName: 'ol',
  className: 'message-view'
});

module.exports = MessagesView;

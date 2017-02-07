var time = require("../../helpers/time");

var MessageView = Backbone.Marionette.View.extend({
  template: require("../templates/message-view-template.html"),
  tagName: 'li',
  className: 'message-view',
  onDomRefresh: function(){
    window.scrollTo(0, document.body.scrollHeight);
  },
  initialize: function(){
    this.date = new Date();
  },
  serializeData: function(){
    return {
      "message": this.model.get('message'),
      "time": time.currentTime(this.date) + " " + time.currentDate(this.date)
    };

  }
});

module.exports = MessageView;

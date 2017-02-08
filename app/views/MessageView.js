var time = require("../../helpers/time");
var Cookie = require("js-cookie");
var moment = require("moment");

var MessageView = Backbone.Marionette.View.extend({
  template: require("../templates/message-view-template.html"),
  tagName: 'li',
  initialize: function(){
    this.date = moment(this.model.get('time')).format("LLLL")
    var cookie = Cookie.get('username');
    var author = this.model.get('author') 
    if(author === cookie){
      this.$el.addClass('self')
      this.avatar = "https://s-media-cache-ak0.pinimg.com/736x/0e/3d/f6/0e3df60cabeec611be2872b82db57458.jpg"
    } else {
      this.$el.addClass('other')
      this.avatar = "https://avatars1.githubusercontent.com/u/15935379?v=3&s=460"
    }
  },
  serializeData: function(){
    return {
      "content": this.model.get('content'),
      "author": this.model.get('author'),
      "time": this.date,
      "avatar": this.avatar
    };
  }
});

module.exports = MessageView;

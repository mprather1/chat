var User = Backbone.Model.extend({
  initialize: function(){
    this.urlRoot = 'http://shintech.ninja:8000/api/users/';
  },
});

module.exports = User;
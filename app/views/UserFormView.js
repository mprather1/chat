var UserFormView = Backbone.Marionette.View.extend({
  template: require("../templates/user-form-template.html"),
  events: {
    'click #user-submit': 'handleClick'
  },
  handleClick: function(e){
    e.preventDefault()
    var formData = new FormData()
    formData.append('upload', $('#filebox')[0].files[0])
    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
        console.log(data)
      }
    })
  }
})

module.exports = UserFormView;
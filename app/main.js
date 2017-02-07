global.jQuery = require("jquery");
global.io = require("socket.io-client");
// console.log(global.io)
require("bootstrap");
require("./public/css/style.scss");

var App = require("./App");

var app = new App();
app.start();

module.exports = app;
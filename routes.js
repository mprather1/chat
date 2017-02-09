var express = require("express");
var router = express.Router();
var users = require("./db").users;
var messages = require("./db").messages
var conversations = require("./db").conversations;

router.route("/users")
  .get(users.getAllUsers)
  .post(users.createUser)

router.route("/users/:id")
  .get(users.getSingleUser)
  .put(users.updateUser)
  .delete(users.removeUser)

router.route('/messages/:id')
  .get(messages.getSingleMessage)
  
router.route('/conversations')
  .get(conversations.getAllConversations)
  .post(conversations.createConversation)
  
router.route('/conversations/:id')
  .get(conversations.getSingleConversation)
  .delete(conversations.removeConversation)
  
router.route('/conversations/:id/messages')
  .get(messages.getAllMessages)
  .post(messages.createMessage)

module.exports = router;
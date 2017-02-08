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
  
router.route('/messages')
  .get(messages.getAllMessages)
  .post(messages.createMessage)

router.route('/messages/:id')
  .get(messages.getSingleMessage)
  
router.route('/conversations')
  .get(conversations.getAllConversations)
  .post(conversations.createConversation)
  
router.route('/conversations/:id')
  .get(conversations.getSingleConversation)
  .delete(conversations.removeConversation)

module.exports = router;
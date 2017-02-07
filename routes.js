var express = require("express");
var router = express.Router();
var users = require("./db").users;

router.route("/users")
  .get(users.getAllUsers)
  .post(users.createUser)

router.route("/users/:id")
  .get(users.getSingleUser)
  .put(users.updateUser)
  .delete(users.removeUser)

module.exports = router;
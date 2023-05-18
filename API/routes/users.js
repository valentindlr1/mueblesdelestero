var express = require('express');
var router = express.Router();
const {
  getAllUsersHandler,
  createUserHandler
} = require("../handlers/userHandler")

/* GET users listing. */
router.get('/', getAllUsersHandler);
router.post('/register', createUserHandler);

module.exports = router;

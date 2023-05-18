var express = require('express');
var router = express.Router();
const {
  getAllUsersHandler,
  createUserHandler,
  loginUserHandler
} = require("../handlers/userHandler")

/* GET users listing. */
router.get('/', getAllUsersHandler);
router.post('/register', createUserHandler);
router.post('/login', loginUserHandler);

module.exports = router;

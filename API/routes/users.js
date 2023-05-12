var express = require('express');
var router = express.Router();
const {
  getAllUsersHandler
} = require("../handlers/userHandler")

/* GET users listing. */
router.get('/', getAllUsersHandler);

module.exports = router;

var express = require('express');
var router = express.Router();
const {
  googleLogin,
  refreshToken
} = require("../handlers/authHandler")

/* GET users listing. */
router.post('/google', googleLogin);
router.post('/google/refresh-token', refreshToken);

module.exports = router;

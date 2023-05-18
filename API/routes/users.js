var express = require("express");
var router = express.Router();
const {
  getAllUsersHandler,
  createUserHandler,
  loginUserHandler,
  forgotPassHandler,
  resetPasshandler,
} = require("../handlers/userHandler");

/* GET users listing. */
router.get("/", getAllUsersHandler);
router.post("/register", createUserHandler);
router.post("/login", loginUserHandler);
router.get("/forgotPass", forgotPassHandler);
router.put("/resetPass", resetPasshandler);

module.exports = router;

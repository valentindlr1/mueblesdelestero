var express = require("express");
var router = express.Router();
const {
  getAllUsersHandler,
  createUserHandler,
  loginUserHandler,
  forgotPassHandler,
  resetPasshandler,
  updateUserInfoHandler,
  setBanStatusHandler,
} = require("../handlers/userHandler");

/* GET users listing. */
router.get("/", getAllUsersHandler);
router.post("/register", createUserHandler);
router.post("/login", loginUserHandler);
router.get("/forgotPass", forgotPassHandler);
router.put("/resetPass", resetPasshandler);
router.put("/update/:id", updateUserInfoHandler);
router.put("/setBan/:id", setBanStatusHandler);

module.exports = router;

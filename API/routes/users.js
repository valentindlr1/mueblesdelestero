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
  logoutUserHandler,
  getUserByEmailHandler,
  getUserByIdHandler,
} = require("../handlers/userHandler");

/* GET users listing. */
router.get("/", getAllUsersHandler);
router.get("/:email", getUserByEmailHandler);
router.get("/account/:id", getUserByIdHandler);
router.post("/register", createUserHandler);
router.post("/login", loginUserHandler);
router.post("/logout", logoutUserHandler);
router.get("/forgotPass", forgotPassHandler);
router.put("/resetPass", resetPasshandler);
router.put("/update/:id", updateUserInfoHandler);
router.put("/setBan/:id", setBanStatusHandler);

module.exports = router;

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
  isAdminCheckHandler,
} = require("../handlers/userHandler");

router.get("/", getAllUsersHandler);
router.get("/:email", getUserByEmailHandler);
router.get("/cuenta/:id", getUserByIdHandler);
router.post("/register", createUserHandler);
router.post("/login", loginUserHandler);
router.post("/logout", logoutUserHandler);
router.get("/forgotPass", forgotPassHandler);
router.put("/resetPass", resetPasshandler);
router.put("/update/:id", updateUserInfoHandler);
router.put("/setBan/:id", setBanStatusHandler);
router.get("/admin/isAdmin/:email", isAdminCheckHandler);

module.exports = router;

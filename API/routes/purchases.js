var express = require("express");
var router = express.Router();
const {
  getAllPurchasesHandler,
} = require("../handlers/purchaseHandler");

/* GET users listing. */
router.get("/", getAllPurchasesHandler);

module.exports = router;
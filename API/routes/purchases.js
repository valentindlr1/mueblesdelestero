var express = require("express");
var router = express.Router();
const {
  getAllPurchasesHandler,
  createPurchaseHandler,
  getByUserIdHandler,
  setStatusHandler,
  getByIdHandler,
} = require("../handlers/purchaseHandler");

/* GET users listing. */
router.get("/", getAllPurchasesHandler);
router.get("/:id", getByIdHandler);
router.post("/:userId", createPurchaseHandler);
router.get("/:userId", getByUserIdHandler);
router.put("/status/:id", setStatusHandler);

module.exports = router;

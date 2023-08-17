var express = require("express");
var router = express.Router();
const {
  getAllPurchasesHandler,
  createPurchaseHandler,
  getByUserIdHandler,
  setStatusHandler,
  getByIdHandler,
  updateTotalPaidHandler,
} = require("../handlers/purchaseHandler");

/* GET users listing. */
router.get("/", getAllPurchasesHandler);
router.get("/:id", getByIdHandler);
router.post("/:userId", createPurchaseHandler);
router.get("/user/:userId", getByUserIdHandler);
router.put("/status/:id", setStatusHandler);
router.put("/totalpaid/:id", updateTotalPaidHandler);

module.exports = router;

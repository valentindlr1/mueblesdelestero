var express = require("express");
var router = express.Router();
const {
  getAllProductsHandler,
  createProductHandler,
  updateProductHandler,
  setStatusHandler,
  getByIdHandler,
  getCartProductsHandler,
} = require("../handlers/productHandler");

router.get("/", getAllProductsHandler);
router.get("/cart/:IDs", getCartProductsHandler);
router.get("/:id", getByIdHandler);
router.post("/", createProductHandler);
router.put("/:id", updateProductHandler);
router.put("/status/:id", setStatusHandler);

module.exports = router;

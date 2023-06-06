var express = require("express");
var router = express.Router();
const {
  getAllProductsHandler,
  createProductHandler,
  updateProductHandler,
  setStatusHandler,
  getByIdHandler,
} = require("../handlers/productHandler");

router.get("/", getAllProductsHandler);
router.get("/:id", getByIdHandler);
router.post("/", createProductHandler);
router.put("/:id", updateProductHandler);
router.put("/status/:id", setStatusHandler);

module.exports = router;

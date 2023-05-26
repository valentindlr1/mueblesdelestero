const {
  getAllPurchases,
  createPurchase,
  getByUserId,
  setStatus,
} = require("../controllers/purchaseController");

async function getAllPurchasesHandler(req, res) {
  try {
    const purchases = await getAllPurchases();
    return res.json(purchases);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400);
  }
}
async function createPurchaseHandler(req, res) {
  try {
    const { userId } = req.params;
    const {
      products,
      limitDate,
      address,
      location,
      ZIPcode,
      province,
      details,
      totalPrice,
    } = req.body;
    const purchase = await createPurchase({
      products,
      limitDate,
      address,
      location,
      ZIPcode,
      province,
      details,
      totalPrice,
      userId,
    });
    return res.json(purchase);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400);
  }
}
async function getByUserIdHandler(req, res) {
  try {
    const { userId } = req.params;
    const purchase = await getByUserId(userId);
    return res.json(purchase);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400);
  }
}
async function setStatusHandler(req, res) {
  try {
    const { id } = req.params;
    const { status, trackCode } = req.body;
    const response = await setStatus({ id, status, trackCode });
    return res.send(response);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400);
  }
}

module.exports = {
  getAllPurchasesHandler,
  createPurchaseHandler,
  getByUserIdHandler,
  setStatusHandler,
};

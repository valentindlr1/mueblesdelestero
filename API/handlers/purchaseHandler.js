const {
  getAllPurchases,
  createPurchase,
  getByUserId,
  setStatus,
  getPurchaseById,
  updateTotalPaid,
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
async function getByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const purchase = await getPurchaseById(id);
    if (purchase) return res.json(purchase);
    return next();
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
      name,
      lName,
      dni,
      phone,
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
      name,
      lName,
      dni,
      phone,
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
async function updateTotalPaidHandler(req, res) {
  try {
    const { id } = req.params;
    const { totalPaid } = req.body;
    const response = await updateTotalPaid({ totalPaid, id });
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
  getByIdHandler,
  updateTotalPaidHandler,
};

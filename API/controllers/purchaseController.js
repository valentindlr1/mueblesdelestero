const { Op } = require("sequelize");
const { Purchase, User } = require("../db");
const {
  sendPurchaseEmail,
  sendUpdatedPurchaseEmail,
} = require("./nodemailerController");

async function getAllPurchases() {
  try {
    const result = await Purchase.findAll();
    return result;
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function createPurchase({
  products,
  limitDate,
  address,
  location,
  ZIPcode,
  province,
  details,
  totalPrice,
  userId,
}) {
  try {
    if (!userId) return "Error: Por favor inicie sesión";
    await Purchase.create({
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
    const user = await User.findByPk(userId);
    const { email, name, lName, dni, phone } = user;
    await sendPurchaseEmail({
      email,
      products,
      totalPrice,
      name,
      lName,
      dni,
      phone,
      address,
      location,
      province,
      ZIPcode,
      details,
    });
    return "Compra realizada con éxito";
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function getByUserId(userId) {
  try {
    const purchases = await Purchase.findAll({ where: { userId } });
    if (!purchases.length) return "Aquí verás el estado de tus compras";
    return purchases;
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function setStatus({ id, status, trackCode }) {
  try {
    await Purchase.update({ status }, { where: { id } });
    if (trackCode) {
      await Purchase.update({ trackCode }, { where: { id } });
    }
    const {userId} = await Purchase.findByPk(id)
    const {email} = await User.findOne({where:{id: userId}})
    await sendUpdatedPurchaseEmail({ status, trackCode, email });
    return "Estado de compra actualizado: " + status;
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}

module.exports = {
  getAllPurchases,
  createPurchase,
  getByUserId,
  setStatus,
};

const { Op } = require("sequelize");
const { Purchase, User, Product } = require("../db");
const {
  sendPurchaseEmail,
  sendUpdatedPurchaseEmail,
  sendUpdatedPaymentEmail,
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
async function getPurchaseById(id) {
  try {
    const result = await Purchase.findByPk(id);
    return result;
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function createPurchase({
  name,
  lName,
  dni,
  phone,
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
    if (!userId)
      return { message: "Error: Por favor inicie sesión", error: true };
    const purchase = await Purchase.create({
      name,
      lName,
      dni,
      phone,
      products,
      limitDate,
      address,
      location,
      ZIPcode: Number(ZIPcode),
      province,
      details,
      totalPrice,
      userId,
    });
    const user = await User.findByPk(userId);
    const { email } = user;

    const productsInfo = await Promise.all(
      products.map(async (prod) => {
        let prodInfo = await Product.findByPk(prod.id);
        let resultData = {
          name: prodInfo.name,
          price: prodInfo.price,
          picture: prodInfo.picture,
          quantity: prod.quantity,
        };
        return resultData;
      })
    );

    await sendPurchaseEmail({
      email,
      products: productsInfo,
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
    return {
      message: "Pedido creado con éxito",
      error: false,
      id: purchase.id,
    };
  } catch (error) {
    console.error("ERROR al crear la compra: ", error.message);
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
async function setStatus({ id, status, trackCode, comprobante }) {
  try {
    const order = await Purchase.findByPk(id);
    await Purchase.update({ status }, { where: { id } });
    if (trackCode) {
      await Purchase.update({ trackCode }, { where: { id } });
    }
    if (comprobante && comprobante.data && comprobante.amount) {
      await Purchase.update(
        {
          comprobantes:
            order.comprobantes !== null
              ? JSON.stringify([...JSON.parse(order.comprobantes), comprobante])
              : JSON.stringify([comprobante]),
        },
        { where: { id } }
      );
    }
    const { userId } = await Purchase.findByPk(id);
    const { email } = await User.findOne({ where: { id: userId } });
    await sendUpdatedPurchaseEmail({ status, trackCode, email });
    return "Estado de compra actualizado: " + status;
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function updateTotalPaid({ totalPaid, id }) {
  try {
    await Purchase.update({ totalPaid }, { where: { id } });

    const { userId, totalPrice } = await Purchase.findByPk(id);
    const { email } = await User.findOne({ where: { id: userId } });
    await sendUpdatedPaymentEmail({ totalPaid, totalPrice, email });
    return (
      "Total abonado: $" +
      totalPaid +
      ". Total del pedido: $" +
      totalPrice +
      "."
    );
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
  getPurchaseById,
  updateTotalPaid,
};

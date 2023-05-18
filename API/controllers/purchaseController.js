const { Op } = require("sequelize");
const { Purchase } = require("../db");

async function getAllPurchases() {
  try {
    const result = await Purchase.findAll();
    return result;
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}

module.exports = {
  getAllPurchases,
};

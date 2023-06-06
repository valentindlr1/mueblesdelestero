const { Op } = require("sequelize");
const { Product } = require("../db");
const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getAllProducts() {
  try {
    let products = await Product.findAll();
    products = products.sort((p) => p.name); // Alphabetic order
    return products;
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}

async function createProduct({ name, price, picture, description, category }) {
  try {
    await Product.create({ name, price, picture, description, category });
    return "Producto creado con éxito!";
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function updateProduct({
  name,
  price,
  picture,
  description,
  category,
  id,
}) {
  try {
    await Product.update(
      { name, price, picture, description, category },
      { where: { id: id } }
    );
    return "Producto actualizado!";
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function setStatus({ id, status }) {
  try {
    await Product.update({ status }, { where: { id: id } });
    if (status === "paused") return "Publicación pausada";
    if (status === "active") return "Publicación reactivada";
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function getById (id) {
  try {
    const product = await Product.findByPk(id)
    if (!product) return "Error al buscar el producto"
    return product
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  setStatus,
  getById,
};

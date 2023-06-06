const {
  getAllProducts,
  createProduct,
  updateProduct,
  setStatus,
  getById,
  getCartProducts,
} = require("../controllers/productController");

async function getAllProductsHandler(req, res) {
  try {
    const products = await getAllProducts();
    return res.json(products);
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function createProductHandler(req, res) {
  try {
    const { name, price, description, picture, category } = req.body;
    const product = await createProduct({
      name,
      price,
      description,
      picture,
      category,
    });
    return res.json(product);
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function updateProductHandler(req, res) {
  try {
    const { id } = req.params;
    const { name, price, description, picture, category } = req.body;
    const product = await updateProduct({
      name,
      price,
      description,
      picture,
      category,
      id,
    });
    return res.json(product);
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function setStatusHandler(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const response = await setStatus({ id, status });
    return res.send(response);
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function getByIdHandler (req, res) {
  try {
    const {id} = req.params
    const result = await getById(id)
    return res.json(result)
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error);
  }
}
async function getCartProductsHandler (req, res) {
  try {
    const {IDs} = req.params
    if(IDs){
      const result = await getCartProducts(JSON.parse(IDs))
      return res.json(result)
    }
    return res.status(302).send("error: IDs undefined")
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}

module.exports = {
  getAllProductsHandler,
  createProductHandler,
  updateProductHandler,
  setStatusHandler,
  getByIdHandler,
  getCartProductsHandler,
};

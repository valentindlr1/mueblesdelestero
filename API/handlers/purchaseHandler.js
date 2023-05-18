const {getAllPurchases} = require("../controllers/purchaseController")

async function getAllPurchasesHandler (req, res) {
    try {
        const purchases = await getAllPurchases()
        return purchases
    } catch (error) {
        console.error("ERROR: ", error.message);
    return res.status(400);
    }
}

module.exports = {
    getAllPurchasesHandler
}
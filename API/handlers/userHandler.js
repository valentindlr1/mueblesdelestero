const {
    getAllUsers
} = require("../controllers/userController")

async function getAllUsersHandler (req, res) {
    try {
        const users = await getAllUsers()
        return res.status(200).json(users)
    } catch (error) {
        console.error("ERROR: ", error.message)
        return res.status(400)
    }
}

module.exports = {
    getAllUsersHandler
}
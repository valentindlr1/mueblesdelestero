const {
    getAllUsers,
    createUser
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
async function createUserHandler (req, res) {
    try {
        await createUser(req.body)
        return res.send("Usuario registrado con éxito")
    } catch (error) {
        console.error("ERROR: ",error.message)
        return res.status(400).json(error)
    }
}

module.exports = {
    getAllUsersHandler,
    createUserHandler
}
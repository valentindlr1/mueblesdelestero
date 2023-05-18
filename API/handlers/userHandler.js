const {
    getAllUsers,
    createUser,
    loginUser,
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
        // First check if user already exists
        const users = await getAllUsers()
        let repeated = false
        users.forEach(u => {
            if (u.email === req.body.email){
                repeated = true
            }
        })
        if (repeated) return res.send("Ya existe un usuario con ese email")
        // Then we can create
        await createUser(req.body)
        return res.send("Usuario registrado con éxito")
    } catch (error) {
        console.error("ERROR: ",error.message)
        return res.status(400).json(error)
    }
}
async function loginUserHandler (req, res) {
    try {
        const {email, password} = req.body
        const result = await loginUser({email, password})
        return res.json(result)
    } catch (error) {
        console.error("ERROR: ",error.message)
        return res.status(400).json(error)
    }
}

module.exports = {
    getAllUsersHandler,
    createUserHandler,
    loginUserHandler,
}
const {
  getAllUsers,
  createUser,
  loginUser,
  forgotPass,
  resetPass,
  updateUserInfo,
  setBanStatus,
  logoutUser,
  getUserByEmail,
} = require("../controllers/userController");
const {
  sendRegisterEmail,
  sendForgotPassMail,
} = require("../controllers/nodemailerController");

async function getAllUsersHandler(req, res) {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400);
  }
}
async function getUserByEmailHandler(req, res) {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    return res.status(200).json(user);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400);
  }
}
async function createUserHandler(req, res) {
  try {
    // First check if user already exists
    const users = await getAllUsers();
    let repeated = false;
    users.forEach((u) => {
      if (u.email === req.body.email) {
        repeated = true;
      }
    });
    if (repeated) return res.send("Ya existe un usuario con ese email");
    // Then we can create
    await createUser(req.body);
    // Send email message
    const { email, name, lName, dni, phone, password } = req.body;
    await sendRegisterEmail({ email, name, lName, dni, phone, password });
    return res.send("Usuario registrado con éxito");
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400).json(error);
  }
}
async function loginUserHandler(req, res) {
  try {
    const { email, password, tokenId } = req.body;
    const result = await loginUser({ email, password, tokenId });
    return res.json(result);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400).json(error);
  }
}
async function logoutUserHandler(req, res) {
  try {
    const { email } = req.body;
    const result = await logoutUser(email);
    return res.send(result);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400).json(error);
  }
}
async function forgotPassHandler(req, res) {
  try {
    const { email } = req.body;
    const response = await forgotPass({ email });
    return res.send(response);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400).json(error);
  }
}
async function resetPasshandler(req, res) {
  try {
    const { token, password } = req.body;
    const result = await resetPass({ token, password });
    return res.send(result);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400).json(error);
  }
}
async function updateUserInfoHandler(req, res) {
  try {
    const { id } = req.params;
    const { name, lName, dni, picture, phone } = req.body;
    const result = await updateUserInfo({
      name,
      lName,
      dni,
      picture,
      phone,
      id,
    });
    return res.send(result);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400).json(error);
  }
}
async function setBanStatusHandler(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await setBanStatus({ status, id });
    return res.send(result);
  } catch (error) {
    console.error("ERROR: ", error.message);
    return res.status(400).json(error);
  }
}

module.exports = {
  getAllUsersHandler,
  createUserHandler,
  loginUserHandler,
  forgotPassHandler,
  resetPasshandler,
  updateUserInfoHandler,
  setBanStatusHandler,
  logoutUserHandler,
  getUserByEmailHandler,
};

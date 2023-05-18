const { Op } = require("sequelize");
const { User } = require("../db");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");

async function getAllUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function createUser({
  name,
  lName,
  email,
  phone,
  dni,
  password,
  picture,
  isAdmin,
}) {
  try {
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      lName,
      email,
      phone,
      dni,
      password: hashPass,
      picture,
      isAdmin,
    });
    return newUser;
  } catch (error) {
    console.error("createUser controller ERROR: ", error.message);
    throw new Error(error);
  }
}
async function loginUser({ email, password }) {
  try {
    // Check if user is registered
    const user = await User.findOne({ where: { email: email } });
    if (!user) return "Email no registrado";
    // Then check the password
    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) return "Credenciales incorrectas";
    // Finally login
    return {
      user: {
        email: email,
        name: user.name,
        lName: user.lName,
        picture: user.picture,
      },
    };
  } catch (error) {
    console.error("ERROR: ", error.mesage);
    throw new Error(error);
  }
}

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
};

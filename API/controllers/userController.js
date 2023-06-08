const { Op } = require("sequelize");
const { User } = require("../db");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendRegisterEmail,
  sendForgotPassMail,
} = require("./nodemailerController");
require("dotenv").config();

async function getAllUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error.message);
  }
}
async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) return "Email no registrado";
    return user;
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
  googleToken,
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
      googleToken,
    });
    return newUser;
  } catch (error) {
    console.error("createUser controller ERROR: ", error.message);
    throw new Error(error);
  }
}
async function loginUser({ email, password, tokenId }) {
  try {
    // Check if user is registered
    const user = await User.findOne({ where: { email: email } });
    if (!user) return "Email no registrado";
    // Then check the password
    const passCheck = await bcrypt.compare(password, user.password);
    if (tokenId){
      await User.update(
        {
          googleToken: tokenId,
        },
        { where: { email: email } }
      )
      // Google Login
      return {
        user: {
          email: email,
          name: user.name,
          lName: user.lName,
          picture: user.picture,
          id: user.id,
        },
      };
    }
    if (!passCheck) return "Credenciales incorrectas";
    // Check if it's not banned
    if (user.isBan) return "Error al acceder: Usuario baneado.";
    // Finally login
    return {
      user: {
        email: email,
        name: user.name,
        lName: user.lName,
        picture: user.picture,
        id: user.id,
      },
    };
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error);
  }
}
async function logoutUser(email) {
  try {
    await User.update(
      {
        googleToken: null,
      },
      { where: { email: email } }
    );
    return "Sesión cerrada";
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error);
  }
}
async function forgotPass({ email }) {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) return "Email incorrecto";
    const { name } = user;
    let token = jwt.sign({ username: name }, process.env.SECRET_JWT, {
      expiresIn: "10m",
    });
    await sendForgotPassMail({ email, name, token });
    await User.update(
      {
        resetToken: token,
      },
      {
        where: {
          email: email,
        },
      }
    );
    return "Se ha enviado un mail de recuperación a " + email;
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error);
  }
}
async function resetPass({ token, password }) {
  try {
    if (!token) return "Error al validar token";
    jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
      if (err) return "Token incorrecto o expirado.";
    });
    const hashPass = await bcrypt.hash(password, 10);
    await User.update(
      {
        password: hashPass,
        resetToken: null,
      },
      {
        where: {
          resetToken: token,
        },
      }
    );
    return "¡Contraseña actualizada con éxito!";
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error);
  }
}
async function updateUserInfo({ name, lName, phone, dni, picture, id }) {
  try {
    await User.update(
      {
        name,
        lName,
        phone,
        dni,
        picture,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return "Datos acualizados";
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error);
  }
}
async function setBanStatus({ status, id }) {
  try {
    await User.update(
      {
        isBan: status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return status ? "Usuario baneado" : "Usuario desbaneado";
  } catch (error) {
    console.error("ERROR: ", error.message);
    throw new Error(error);
  }
}

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  forgotPass,
  resetPass,
  updateUserInfo,
  setBanStatus,
  logoutUser,
  getUserByEmail,
};

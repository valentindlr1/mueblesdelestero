const nodemailer = require("nodemailer");
require("dotenv").config();
const config = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "mueblesdelestero@gmail.com",
    pass: process.env.nodemailer,
  },
};
const transporter = nodemailer.createTransport(config);

const sendRegisterEmail = async ({
  email,
  name,
  lName,
  dni,
  phone,
  password,
}) => {
  const message = {
    from: "mueblesdelestero@gmail.com",
    to: email,
    subject: `Bienvenido ${name} a mueblesdelestero`,
    text: `¡Gracias por registrarte en mueblesdelestero!`,
    html: `<div style="background-color: #F5F1ED; color: #252323;">
    <h1>¡Gracias por registrarte en mueblesdelestero!</h1>
    <h2>Ya puedes encargar pedidos</h2>
    <h3>Te registraste con lo siguientes datos:</h3>
    <ul>
    <li>Nombre: ${name}</li>
    <li>Apellido: ${lName}</li>
    <li>DNI: ${dni || "Sin DNI"}</li>
    <li>Teléfono: ${phone || "Sin teléfono"}</li>
    <li>Contraseña: ${password}</li>
    </ul>
    </div>`,
  };

  await transporter.sendMail(message);
};
const sendForgotPassMail = async ({ email, name, token }) => {
  const message = {
    from: "mueblesdelestero@gmail.com",
    to: email,
    subject: `Solicitud de cambio de contraseña`,
    text: `Cambiar contraseña`,
    html: `<div style="background-color: #F5F1ED; color: #252323;">
    <h1>Se ha solicitado un cambio de contraseña para ${name}</h1>
    <h2>Haz click en el link para cambiar tu contraseña:</h2>
    <h3>http://127.0.0.1:5173/resetpass?token=${token}</h3>
    <p>Link válido por 10 minutos. Único uso.</p>
    <p>¿No fuiste tú? Ignora este correo.</p>
    </div>`,
  };

  await transporter.sendMail(message);
};

module.exports = {
  sendRegisterEmail,
  sendForgotPassMail,
};

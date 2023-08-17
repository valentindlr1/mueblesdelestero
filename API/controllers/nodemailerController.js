const nodemailer = require("nodemailer");
require("dotenv").config();
const config = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "mueblesdelestero@gmail.com",
    pass: process.env.nodemailer,
  },
  tls: {
    rejectUnauthorized: false,
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
const sendPurchaseEmail = async ({
  email,
  products,
  totalPrice,
  name,
  lName,
  dni,
  phone,
  address,
  location,
  province,
  ZIPcode,
  details,
}) => {
  const showProducts = products.map(
    (p) => `
    <article>
      <h3>${p.name}</h3>
      <p>Cantidad: ${p.quantity}</p>
      <p>Precio por unidad: ${p.price}</p>
      <img src=${p.picture} alt="productImage"/>
    </article>
    `
  );
  const message = {
    from: "mueblesdelestero@gmail.com",
    to: email,
    subject: `Detalle de tu compra en Muebles del Estero`,
    text: `Compra realizada, datos:...`,
    html: `<div style="background-color: #F5F1ED; color: #252323;">
    <h1>¡Hola ${name}, gracias por tu compra!</h1>
    <h2>Datos para abonar</h2>
    <div>
    <p>Alias: VALENTINHR</p>
    <p>Titular: Valentin Herrera De la Rua</p>
    <p>Banco: BRUBANK</p>
    <p>Envía el comprobante por <a>WhatsApp</a> o <a>Instagram</a></p>
    </div>
    <h2>Detalle del pedido</h2>
    <div>
    <h3>Productos</h3>
    <div>${showProducts}</div>
    <h3>TOTAL</h3>
    <h3>$${totalPrice}</h3>
    <h2>Datos de envío</h2>
    <div>
    <p>Recibe: ${name} ${lName}</p>
    <p>DNI: ${dni}</p>
    <p>Tel.: ${phone}</p>
    <p>Provincia: ${province}</p>
    <p>Localidad: ${location}</p>
    <p>Código Postal: ${ZIPcode}</p>
    <p>Dirección: ${address === "Sucursal" ? "A sucursal" : address}</p>
    <p>Detalles o aclaraciones: ${details}</p>
    </div>
    </div>
    </div>`,
  };

  await transporter.sendMail(message);
};
const sendUpdatedPurchaseEmail = async ({ status, trackCode, email }) => {
  const message = {
    from: "mueblesdelestero@gmail.com",
    to: email,
    subject: `Estado de su pedido en Muebles del Estero`,
    text: `Se ha actualizado el estado de su compra`,
    html: `<div style="background-color: #F5F1ED; color: #252323;">
    <h1>Se ha actualizado el estado de su compra</h1>
    <h2>Nuevo estado: ${status}</h2>
    <h3>${trackCode ? "Código de seguimiento: " + trackCode : ""}</h3>
    </div>`,
  };

  await transporter.sendMail(message);
};
const sendUpdatedPaymentEmail = async ({ totalPaid, totalPrice, email }) => {
  const message = {
    from: "mueblesdelestero@gmail.com",
    to: email,
    subject: `Pago confirmado en Muebles del Estero`,
    text: `Se ha confirmado el pago de su compra`,
    html: `<div style="background-color: #F5F1ED; color: #252323;">
    <h1>Se ha confirmado el pago de su compra</h1>
    <h2>Total abonado: $${totalPaid}</h2>
    <h2>Total del pedido: $${totalPrice}</h2>
    </div>`,
  };

  await transporter.sendMail(message);
};

module.exports = {
  sendRegisterEmail,
  sendForgotPassMail,
  sendPurchaseEmail,
  sendUpdatedPurchaseEmail,
  sendUpdatedPaymentEmail,
};

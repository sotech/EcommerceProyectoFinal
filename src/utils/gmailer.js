require('dotenv').config();
const nodemailer = require('nodemailer');
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
})
const newUserOptions = {
  from: 'Servidor Node.js',
  to: 'germansommariva@gmail.com',
  subject: 'Nuevo registro',
  html:'<h3>Se ha registrado un nuevo usuario</h3>'
}

const newUserMail = () => {
  
  gmailTransporter.sendMail(newUserOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log(info);
  })
}

const pedidoCarritoOptions = {
  from: 'Servidor Node.js',
  to: 'germansommariva@gmail.com',
}

const pedidoCarritoMail = (nombre,email,listaProductos) => {
  pedidoCarritoOptions.subject = `Nuevo pedido de ${nombre} - ${email}`;
  pedidoCarritoOptions.html = `<h3>Productos:</h3><ul>`;
  listaProductos.map((p) => {
    pedidoCarritoOptions.html = pedidoCarritoOptions.html + `<li>${p.nombre}</li>`
  });
  pedidoCarritoOptions.html = pedidoCarritoOptions.html + `</ul>`;  
  gmailTransporter.sendMail(pedidoCarritoOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log(info);
  })
}
module.exports = {newUserMail,pedidoCarritoMail};
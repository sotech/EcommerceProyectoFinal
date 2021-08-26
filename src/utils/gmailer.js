require('dotenv').config();
const nodemailer = require('nodemailer');
const info = require('log4js').getLogger();
const errors = require('log4js').getLogger('errors');
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
})
const newUserOptions = {
  from: 'Servidor Node.js',
  to: process.env.MAIL_ADMIN,
  subject: 'Nuevo registro',
  html:'<h3>Se ha registrado un nuevo usuario</h3>'
}

const newUserMail = () => {
  
  gmailTransporter.sendMail(newUserOptions, (err, info) => {
    if (err) {
      errors.error(err);
    }
    (info);
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
    pedidoCarritoOptions.html += pedidoCarritoOptions.html + `<li>Nombre:${p._id.nombre} 
    Cantidad: ${p.cantidad} 
    Precio: ${p._id.precio} 
    Descripcion: ${p._id.descripcion}
    </li>`
  });
  pedidoCarritoOptions.html = pedidoCarritoOptions.html + `</ul>`;  
  gmailTransporter.sendMail(pedidoCarritoOptions, (err, infom) => {
    if (err) {
      errors.error(err);
    }
    info.info(infom);
  })
}
module.exports = {newUserMail,pedidoCarritoMail};
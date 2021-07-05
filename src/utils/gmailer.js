const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
})

const nuevoRegistroOptions = {
  from: 'Servidor Node.js',
  to: 'germansommariva@gmail.com',
  subject: 'Nuevo registro',
  html:'<h3>Se ha registrado un nuevo usuario</h3>'
}

const newUserMail = () => {
  transporter.sendMail(nuevoRegistroOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log(info);
  })
}
module.exports = {newUserMail};
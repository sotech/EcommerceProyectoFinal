require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const info = require('log4js').getLogger();

//Hardcoded telefonos por la cuenta de prueba de twilio
const enviarWppPedido = (nombre,email) => {
  const mensaje = `Nuevo pedido de ${nombre} - ${email}`;
  client.messages.create({
    body: mensaje,
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+5493876846639'
  })
    .then(msj => info.info("Mensaje enviado",msj.sid))
    .catch(console.log())
}

const enviarSMSPedidoRecibido = (telefono) => {
  client.messages.create({
    body: 'Su pedido ha sido recibido y se encuentra en proceso',
    from: '+14125207051',
    to: telefono
  })
    .then(msj => info.info("Mensaje enviado",msj.sid))
    .catch(console.log())
}
module.exports = { enviarWppPedido,enviarSMSPedidoRecibido};
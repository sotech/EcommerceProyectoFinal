const Singleton = require('../persistencias/singletonUser');
const baseDeDatos = Singleton.getInstancia().dao;
const bcrypt = require('bcrypt-nodejs');

exports.obtenerUsuario = async email => {
  const user = await baseDeDatos.obtenerUsuario(email);
  return user;
}

exports.obtenerUsuarioPorId = async id => {
  const user = await baseDeDatos.obtenerUsuarioPorId(id);
  return user;
}

exports.crearUsuario = async payload => {
  const usuario = await baseDeDatos.crearUsuario(payload);
  return usuario;
}

exports.encriptarContrasena = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

exports.compararContrasenas = (password, otherPassword) => {
  return bcrypt.compareSync(password, otherPassword);
}
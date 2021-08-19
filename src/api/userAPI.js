require('../utils/mongoConnection');
const User = require("../models/userModel");
const bcrypt = require('bcrypt-nodejs');

exports.obtenerUsuario = async email => {
  const user = await User.find({'email':email});
  return user;
}

exports.crearUsuario = async payload => {
  const { nombre, descripcion, codigo, precio, fotoUrl, stock } = payload;
  const User = {
    timestamp: new Date(),
    nombre,
    descripcion,
    codigo,
    precio,
    fotoUrl,
    stock
  };
  const nuevoUser = await User.create(User);
  return nuevoUser
}

exports.encriptarContrasena = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

exports.compararContrasenas = (password, otherPassword) => {
  return bcrypt.compareSync(password, otherPassword);
}
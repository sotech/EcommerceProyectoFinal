require('../utils/mongoConnection');
const User = require("../models/userModel");
const carritoAPI = require("./carritoAPI");
const bcrypt = require('bcrypt-nodejs');

exports.obtenerUsuario = async email => {
  const user = await User.find({'email':email});
  return user[0];
}

exports.obtenerUsuarioPorId = async id => {
  const user = await User.findById(id);
  return user;
}

exports.crearUsuario = async payload => {
  console.log(payload);
  const { email, password, nombre, telefono, foto } = payload;
  const carrito = await carritoAPI.crearCarrito();
  const usuarioData = {
    email,
    password,
    nombre,
    telefono,
    foto,
    carrito
  };
  const nuevoUser = await User.create(usuarioData);
  return nuevoUser
}

exports.encriptarContrasena = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

exports.compararContrasenas = (password, otherPassword) => {
  return bcrypt.compareSync(password, otherPassword);
}
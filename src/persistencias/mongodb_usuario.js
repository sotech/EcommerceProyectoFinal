require('../utils/mongoConnection');
const User = require("../models/userModel");
const carritoAPI = require("../api/carritoAPI");

exports.obtenerUsuario = async email => {
  const user = await User.find({ 'email': email });
  return user[0];
}

exports.obtenerUsuarioPorId = async id => {
  const user = await User.findById(id);
  return user;
}

exports.crearUsuario = async payload => {
  const { email, password, nombre, telefono } = payload;
  const carrito = await carritoAPI.crearCarrito();
  const usuarioData = {
    email,
    password,
    nombre,
    telefono,
    carrito
  };
  const nuevoUser = await User.create(usuarioData);
  return nuevoUser
}
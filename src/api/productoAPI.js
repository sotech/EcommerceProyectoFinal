require('../utils/mongoConnection');
const Producto = require("../models/productoModel");

exports.obtenerProductoPorId = async id => {
  const producto = await Producto.findById(id);
  return producto;
}

exports.obtenerProductos = async () => {
  const productos = await Producto.find();
  return productos;
};

exports.agregarProducto = async payload => {
  const {nombre,descripcion,codigo,precio,fotoUrl,stock} = payload;
  const producto = {
    timestamp : new Date(),
    nombre,
    descripcion,
    codigo,
    precio,
    fotoUrl,
    stock
  };
  const nuevoProducto = await Producto.create(producto);
  return nuevoProducto
}

exports.actualizarProducto = async (id,payload) => {
  const producto = await Producto.findByIdAndUpdate(id,payload);
  return producto;
}
exports.borrarProducto = async id => {
  const producto = await Producto.findByIdAndRemove(id);
  return producto
}
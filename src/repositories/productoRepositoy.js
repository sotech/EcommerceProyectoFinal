require('../utils/mongoConnection');
const Producto = require("../models/productoModel");

exports.obtenerProductos = async () => {
  const productos = await Producto.find();
  return productos;
};
exports.obtenerProductosPorCategoria = async categoria =>{
  const productos = await Producto.find({"categoria":categoria});
  return productos;
}

exports.actualizarProducto = async (id,payload) => {
  const producto = await Producto.findByIdAndUpdate(id,payload);
  return producto;
}

exports.productoById = async id => {
  const producto = await Producto.findById(id);
  return producto;
}
exports.crearProducto = async payload => {
  const nuevoProducto = await Producto.create(payload);
  return nuevoProducto
}
exports.removerProducto = async id => {
  const producto = await Producto.findByIdAndRemove(id);
  return producto
}
require('../utils/mongoConnection');
const Producto = require("../models/productoModel");

exports.obtenerProductoPorId = async id => {
  const producto = await Producto.findById(id);
  return producto;
};

exports.obtenerProductoPorNombre = async nombre => {
  const producto = await Producto.find({'nombre':nombre});
  return producto;
};

exports.obtenerProductoPorRangoPrecio = async (min,max) =>{
  const productos = await Producto.find({'precio':{$gte:min,$lte:max}});
  return productos;
};

exports.obtenerProductoPorRangoStock = async (min, max) => {
  const productos = await Producto.find({ 'stock': { $gte: min, $lte: max } });
  return productos;
};

exports.obtenerProductoPorCodigo = async codigo => {
  const producto = await Producto.find({ 'codigo': codigo });
  return producto;
};

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
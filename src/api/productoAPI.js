const Singleton = require('../persistencias/singletonProductos');
let baseDeDatos = null;
(async () => {
  baseDeDatos = await Singleton.getInstancia().dao;
})();
exports.obtenerProductoPorId = async id => {
  const producto = await baseDeDatos.obtenerProductoPorId(id);
  return producto;
};

exports.obtenerProductoPorNombre = async nombre => {
  const producto = await baseDeDatos.obtenerProductoPorNombre(nombre);
  return producto;
};

exports.obtenerProductoPorRangoPrecio = async (min, max) => {
  const productos = await baseDeDatos.obtenerProductoPorRangoPrecio(min, max);
  return productos;
};

exports.obtenerProductoPorRangoStock = async (min, max) => {
  const productos = await baseDeDatos.obtenerProductoPorRangoStock(min, max);
  return productos;
};

exports.obtenerProductoPorCodigo = async codigo => {
  const producto = await baseDeDatos.obtenerProductoPorCodigo(codigo);
  return producto;
};

exports.obtenerProductos = async () => {
  const productos = await baseDeDatos.obtenerProductos();
  return productos;
};

exports.agregarProducto = async payload => {
  const nuevoProducto = await baseDeDatos.agregarProducto(payload);
  return nuevoProducto
}

exports.actualizarProducto = async (id, payload) => {
  const producto = await baseDeDatos.actualizarProducto(id, payload);
  return producto;
}
exports.borrarProducto = async id => {
  const producto = await baseDeDatos.borrarProducto(id);
  return producto
}
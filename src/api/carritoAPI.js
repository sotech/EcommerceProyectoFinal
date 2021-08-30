const Singleton = require('../persistencias/singletonCarrito');
let baseDeDatos = null;
(async () => {
  baseDeDatos = await Singleton.getInstancia().dao;
})();
exports.obtenerProductoPorId = async (id) => {
  const producto = await baseDeDatos.obtenerProductoPorId(id);
  return producto
}

exports.obtenerCarrito = async (id) => {
  const carrito = await baseDeDatos.obtenerCarrito(id);
  return carrito;
}

exports.agregarProducto = async (id_carrito, id_producto) => {
  const resultado = await baseDeDatos.agregarProducto(id_carrito,id_producto);
  return resultado;
}

exports.crearCarrito = async () => {
  const resultado = await baseDeDatos.crearCarrito();
  return resultado;
};

exports.comprar = async (id) => {
  const carrito = await baseDeDatos.comprar(id);
  return carrito
};

exports.borrarProducto = async (id_carrito,id_producto) => {
  const resultado = await baseDeDatos.borrarProducto(id_carrito, id_producto);
  return resultado;
}

exports.borrarCarrito = async (id) => {
  return await baseDeDatos.borrarCarrito(id);
}
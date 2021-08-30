require('../utils/mongoConnection');
const Carrito = require("../models/carritoModel");
const productoAPI = require("../api/productoAPI");

exports.obtenerProductoPorId = async (id) => {
  const carritoPopulado = await Carrito.findOne().populate({
    path: 'items._id',
    model: 'Producto'
  });
  const producto = carritoPopulado.items.filter(p => p._id._id == id);
  return producto[0];
}

exports.obtenerCarrito = async (id) => {
  const carrito = await Carrito.findById(id).populate({
    path: 'items._id',
    model: 'Producto'
  });
  return carrito;
}

exports.agregarProducto = async (id_carrito, id_producto) => {
  const producto = await productoAPI.obtenerProductoPorId(id_producto);
  const carrito = await Carrito.findById(id_carrito);
  let existe = false;
  carrito.items.map(item => {
    if (JSON.stringify(item._id) == JSON.stringify(producto._id)) {
      item.cantidad++;
      existe = true;
    }
  })
  if (!existe) {
    carrito.items.push(producto._id);
  }
  return await carrito.save();
}

exports.crearCarrito = async () => {
  const carrito = new Carrito({});
  carrito.timestamp = new Date();
  return await carrito.save();
};

exports.comprar = async (id) => {
  //Por ahora solo devolver el carrito con los productos
  const carrito = await Carrito.findById(id).populate({
    path: 'items._id',
    model: 'Producto'
  });
  return carrito;
};

exports.borrarProducto = async (id_carrito, id_producto) => {
  const carrito = await Carrito.findById(id_carrito);
  //Buscar item
  carrito.items.map(item => {
    if (JSON.stringify(item._id) == JSON.stringify(id_producto)) {
      item.cantidad--;
    }
  })
  //Quitar
  carrito.items = carrito.items.filter(item => item.cantidad > 0);
  return await carrito.save();
}

exports.borrarCarrito = async (id) => {
  return await Carrito.findByIdAndDelete(id);
}
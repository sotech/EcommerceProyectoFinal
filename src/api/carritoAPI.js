require('../utils/mongoConnection');
const Carrito = require("../models/carritoModel");
const productoAPI = require('./productoAPI');

exports.obtenerProductoPorId = async (id) =>{
  const carritoPopulado = await Carrito.findOne().populate({
    path: 'items._id',
    model: 'Producto'
  });
  const producto = carritoPopulado.items.filter(p => p._id._id == id);
  console.log(producto);
  return producto[0];
}

exports.obtenerCarrito = async() => {
  const carrito = await Carrito.findOne().populate({
    path:'items._id',
    model:'Producto'
  });
  return carrito;
}

exports.agregarProducto = async(id) => {
  const producto = await productoAPI.obtenerProductoPorId(id);
  const carrito = await Carrito.findOne({});
  let existe = false;
  carrito.items.map(item => {
    if (JSON.stringify(item._id) == JSON.stringify(producto._id)) {
      item.cantidad++;
      existe = true;
    }
  })
  if(!existe){
    carrito.items.push(producto._id);
  } 
  return await carrito.save();
}

exports.crearCarrito = async() => {
  const carrito = new Carrito({});
  carrito.timestamp = new Date();
  return await carrito.save();
}

exports.borrarProducto = async(id)=>{
  const carrito = await Carrito.findOne({});
  carrito.items = carrito.items.filter(p => p._id != id);
  return await carrito.save();
}

exports.borrarCarrito = async(id) =>{
  return await Carrito.findByIdAndDelete(id);
}
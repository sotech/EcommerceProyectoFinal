const productoModel = require('../models/productoModel');

module.exports = {
  GenerarProducto(datos){
    return new productoModel({
      _id: 1,
      timestamp: datos.timestamp,
      descripcion: datos.descripcion,
      codigo: datos.codigo,
      foto: datos.foto,
      precio: datos.precio,
      stock: datos.stock
    })
  }
}
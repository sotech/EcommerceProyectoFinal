const Producto = require('../../models/productoModel');

class MongoDBProductosPersistencia{
  constructor() {
    require('../../utils/mongoConnection');
  }

  guardarProducto = async (producto) => {
    const productoAGuardar = new Producto(producto);
    const resultado = await productoAGuardar.save();
    return resultado;
  }

  listarProducto = async (id) => {
    const resultado = await Producto.findById(id);
    return resultado;
  }

  listarProductos = async () => {
    const resultado = await Producto.find();
    return resultado;
  }

  actualizarProducto = async (id, producto) => {
    const resultado = await Producto.findByIdAndUpdate(id, producto)
    return resultado;
  }

  borrarProducto = async (id) => {
    const resultado = await Producto.findByIdAndDelete(id)
    return resultado;
  }

}

module.exports = MongoDBProductosPersistencia;
const Singleton = require('../persistencias/singletons/singletonProductosFactory');

const DBProductos = Singleton.getInstance().baseDatos;

module.exports = {
  async buscarTodos(){
    return DBProductos.listarProductos();
  },

  async buscarUno(id){
    return DBProductos.listarProducto(id);
  },

  async guardar(producto){
    return DBProductos.guardarProducto(producto);
  },

  async borrar(id){
    return DBProductos.borrarProducto(id);
  },

  async actualizar(id,producto){
    return DBProductos.actualizarProducto(id,producto);
  }
}

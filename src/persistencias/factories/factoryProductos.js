const persistenciaElegida = process.env.PERSISTENCIA_PRODUCTOS;
//Importar persistencias
const mongodbPersistencia = require('../productos/mongodbProductosPersistencia');
const sqlitePersistencia = require('../productos/sqliteProductosPersistencia');
const info = require('log4js').getLogger();

class FactoryProductos{
  constructor(){
    this.nombrePersistencia = persistenciaElegida;
    info.info("PERSISTENCIA PRODUCTOS: " + this.nombrePersistencia);
  }
  obtenerPersistencia(){
    switch(this.nombrePersistencia){
      case 'MONGODB':
        return new mongodbPersistencia();
        break;
      case 'SQLITE':
        return new sqlitePersistencia();
        break;
      default:
        return null;
        break;
    }
  }
}

module.exports = FactoryProductos;
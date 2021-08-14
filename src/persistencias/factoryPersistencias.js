const persistenciaElegida = process.env.PERSISTENCIA_ELEGIDA;
//Importar persistencias
const mongodbPersistencia = require('./mongodbPersistencia');
const sqlitePersistencia = require('./sqlitePersistencia');
const info = require('log4js').getLogger();
//Clase
class FactoryPersistencias{
  constructor(){
    this.nombrePersistencia = persistenciaElegida;
    info.info("PERSISTENCIA: " + this.nombrePersistencia);
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

module.exports = FactoryPersistencias;
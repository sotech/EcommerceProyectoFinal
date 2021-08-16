const persistenciaElegida = process.env.PERSISTENCIA_USUARIOS;
//Importar persistencias
const mongodbPersistencia = require('../Usuarios/mongodbUsuariosPersistencia');
const sqlitePersistencia = require('../Usuarios/sqliteUsuariosPersistencia');
const info = require('log4js').getLogger();

class FactoryUsuarios {
  constructor() {
    this.nombrePersistencia = persistenciaElegida;
    info.info("PERSISTENCIA USUARIOS: " + this.nombrePersistencia);
  }
  obtenerPersistencia() {
    switch (this.nombrePersistencia) {
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

module.exports = FactoryUsuarios;
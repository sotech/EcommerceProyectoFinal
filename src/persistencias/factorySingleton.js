let instancia = null;
const FactoryPersistencias = require('./factoryPersistencias');

const factory = new FactoryPersistencias();

class FactorySingleton{
  constructor(){
    this.baseDatos = factory.obtenerPersistencia();
  }

  static getInstance(){
    if(!instancia){
      instancia = new FactorySingleton();
    }

    return instancia;
  }
}

module.exports = FactorySingleton;
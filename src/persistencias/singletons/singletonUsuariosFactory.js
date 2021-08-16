let instancia = null;
const FactoryUsuarios = require('../factories/factoryUsuarios');

const factory = new FactoryUsuarios();

class SingletonUsuariosFactory {
  constructor() {
    this.baseDatos = factory.obtenerPersistencia();
  }

  static getInstance() {
    if (!instancia) {
      instancia = new SingletonUsuariosFactory();
    }

    return instancia;
  }
}

module.exports = SingletonUsuariosFactory;